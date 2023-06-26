import { HttpRequest, HttpResponse } from "uWebSockets.js";

/* Helper function for reading a posted body */
export function readStream(
  res: HttpResponse,
  req: HttpRequest,
  chunkHandler: (chunk: ArrayBuffer) => void,
  endHandler: (err: any) => void
) {
  res.onAborted(() => endHandler(new Error("Request aborted")));
  res.onData((ab, isLast) => {
    chunkHandler(ab);
    if (isLast) endHandler(null);
  });
}
