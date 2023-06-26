import { HeaderList, HttpStatus } from "../router";
import HttpResponse from "./HttpResponse";
import { HTTPHEADERS, HTTPCONTENT } from "../utils";

export default class PlainResponse extends HttpResponse {
  constructor(data: string, status?: HttpStatus, headers?: HeaderList) {
    super(status, data, { [HTTPHEADERS.CONTENT_TYPE]: HTTPCONTENT.PLAIN, ...headers });
  }
}
