import { HeaderList, HttpStatusServerError } from "../router";
import JsonResponse from "./JsonResponce";

export default class ThrowResponse extends JsonResponse {
  constructor(data: Error, status?: HttpStatusServerError, headers?: HeaderList) {
    super(
      process.env.RELEASE
        ? data.message
        : {
            name: data.name,
            message: data.message,
            stack: data.stack?.split("\n"),
            cause: data.cause,
          },
      status,
      headers
    );
  }
}
