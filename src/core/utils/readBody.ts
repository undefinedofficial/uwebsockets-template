import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { readStream } from "./readStream";

export default function readBody(res: HttpResponse, req: HttpRequest) {
  return new Promise<string>((resolve, reject) => {
    let buffer: Buffer;
    readStream(
      res,
      req,
      (chunk) =>
        (buffer = Buffer.concat(buffer ? [buffer, Buffer.from(chunk)] : [Buffer.from(chunk)])),
      (err) => (err ? reject(err) : resolve(buffer.toString()))
    );
  });
}
