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

export const authSendActivateEmailValidation = {

  email: [required, isString,  maxLength(255), minLength(6)],


}
