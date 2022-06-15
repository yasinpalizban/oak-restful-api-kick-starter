
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

export const authSigninValidation = {

  login: [required, isString, maxLength(255), minLength(5)],
  password: [required, isString, maxLength(255), minLength(6)],
  remember: [isBool],

}
