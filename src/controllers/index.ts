import AjvErrorResponse from "../core/responses/AjvErrorResponse";
import ErrorResponse from "../core/responses/ErrorResponse";
import JsonResponse from "../core/responses/JsonResponce";
import PlainResponse from "../core/responses/PlainResponse";
import { EndpointHandler } from "../core/router";
import jsonBody from "../core/utils/jsonBody";
import readBody from "../core/utils/readBody";
import { testValidation } from "../validator";

export const test: EndpointHandler = (res, req) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new JsonResponse({
          hello: "world",
        })
      );
    }, 2000);
  });
};
export const body: EndpointHandler = async (res, req) => {
  return readBody(res, req)
    .then((body) => {
      return new PlainResponse(body);
    })
    .catch((err) => new ErrorResponse(err));
};

export const validate: EndpointHandler = async (res, req) => {
  return jsonBody(res, req)
    .then(async (model) => {
      if (!testValidation(model)) return new AjvErrorResponse(testValidation);

      return new JsonResponse(model);
    })
    .catch((err) => new ErrorResponse(err));
};
