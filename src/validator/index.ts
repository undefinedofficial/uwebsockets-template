import { ajv, compileSchema } from "../core/validator";

export const testValidation = compileSchema({
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
});
