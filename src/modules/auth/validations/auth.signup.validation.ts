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

export const authSignupValidation = {

  username: [required, isString,  maxLength(255), minLength(6)],
  login: [required, isString,  maxLength(255), minLength(6)],
  password: [required, isString,  maxLength(255), minLength(6)],
  passwordConfirm: [required, isString,  maxLength(255), minLength(6)],
  // token: [required],
  // action: [required],

}