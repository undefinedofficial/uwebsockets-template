import {
  HttpResponse as uHttpResponse,
  HttpRequest as uHttpRequest,
  RecognizedString,
} from "uWebSockets.js";

import { HTTPCODES } from "../utils";
import { HeaderList, HttpStatus } from "../router";

export default class HttpResponse {
  constructor(
    public readonly status: HttpStatus = HTTPCODES.OK,
    public readonly body?: RecognizedString,
    public readonly headers?: HeaderList,
    public readonly closeConnection?: boolean
  ) {}

  send(res: uHttpResponse, req: uHttpRequest) {
    res.cork(() => {
      res.writeStatus(this.status);
      if (this.headers)
        Object.entries(this.headers).forEach(([key, value]) => res.writeHeader(key, value));
      res.end(this.body, this.closeConnection);
    });
    return this;
  }
}
