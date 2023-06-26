import Ajv, { JSONSchemaType, Schema, ValidateFunction } from "ajv";
import ajvErrors from "ajv-errors";

export const ajv = ajvErrors(new Ajv({ allErrors: true }));

export function compileSchema<TSchema extends Schema>(schema: JSONSchemaType<TSchema> | TSchema) {
  return ajv.compile<TSchema>(schema);
}
export function errorNormalize<TSchema>(validateFunction: ValidateFunction<TSchema>) {
  return validateFunction.errors?.map((e) => e.message!);
}
