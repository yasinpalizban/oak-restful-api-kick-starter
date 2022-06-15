
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

export const authActivateTokenPhoneValidation = {
  phone: [required, isString, maxLength(255), minLength(6)],
  activeToken: [required, isString, maxLength(255), minLength(6)],

}
