import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { HTTPCONTENT } from "./HTTPCONTENT";
import readBody from "./readBody";

export default async function jsonBody<T>(res: HttpResponse, req: HttpRequest) {
  const contentType = req.getHeader("content-type");
  if (contentType !== HTTPCONTENT.JSON) return Promise.reject(new Error("Invalid content-type"));

  return readBody(res, req).then((body) => JSON.parse(body) as T);
}
