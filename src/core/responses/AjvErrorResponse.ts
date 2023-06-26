import { ValidateFunction } from "ajv";
import { HeaderList, HttpStatusClientError } from "../router";
import { HTTPCODES } from "../utils";
import ErrorResponse from "./ErrorResponse";
import { errorNormalize } from "../validator";

export default class AjvErrorResponse<TSchema> extends ErrorResponse {
  constructor(
    validateFunction: ValidateFunction<TSchema>,
    status: HttpStatusClientError = HTTPCODES.BAD_REQUEST,
    headers?: HeaderList
  ) {
    super(errorNormalize(validateFunction), status, headers);
  }
}
