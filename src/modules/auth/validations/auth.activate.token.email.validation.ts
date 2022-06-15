
import {
  validate,
  flattenMessages,
  required,
  isNumber,
  isString,
  isBool,
  validateArray,
  validateObject,
  maxLength,
  minLength
} from "https://deno.land/x/validasaur/mod.ts";

export const authActivateTokenEmailValidation = {
  email: [required, isString, maxLength(6), minLength(255)],
  activeToken: [required, isString, maxLength(6), minLength(255)],

}

