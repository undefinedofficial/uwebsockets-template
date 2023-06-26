import JsonResponse from "./JsonResponce";
import { HeaderList, HttpStatusClientError } from "../router";

export default class ErrorResponse extends JsonResponse {
  constructor(data: any, status?: HttpStatusClientError, headers?: HeaderList) {
    super(data, status, headers);
  }
}
