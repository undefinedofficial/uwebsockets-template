import type { HttpResponse as uHttpResponse, HttpRequest as uHttpRequest } from "uWebSockets.js";

import { HeaderList, HttpStatus } from "../router";
import HttpResponse from "./HttpResponse";
import { HTTPHEADERS, contentTypeByExt } from "../utils";
import { readFileSync } from "fs";
import { extname } from "path";

export default class FileResponse extends HttpResponse {
  constructor(filepath: string, status?: HttpStatus, headers?: HeaderList) {
    const ext = extname(filepath).slice(1);
    const file = readFileSync(filepath, { flag: "r" });
    super(status, file, {
      [HTTPHEADERS.CONTENT_TYPE]: contentTypeByExt(ext),
      ...headers,
    });
  }
}
