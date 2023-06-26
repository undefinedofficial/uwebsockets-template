import { HeaderList, HttpStatus } from "../router";
import HttpResponse from "./HttpResponse";
import { HTTPHEADERS, HTTPCONTENT } from "../utils";

export default class JsonResponse extends HttpResponse {
  constructor(data: any, status?: HttpStatus, headers?: HeaderList) {
    super(status, JSON.stringify(data), {
      [HTTPHEADERS.CONTENT_TYPE]: HTTPCONTENT.JSON,
      ...headers,
    });
  }
}
