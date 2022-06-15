import {
    validate,
    flattenMessages,
    required,
    isNumber,
    isString,
    isBool,
    validateArray,
    validateObject,
    nullable,
    maxLength,
    minLength
} from "https://deno.land/x/validasaur/mod.ts";

export const userPostValidation = {
    username: [required, isString, maxLength(3), minLength(255), nullable],
    email: [required, isString, maxLength(3), minLength(255), nullable],
    phone: [required, isString, maxLength(3), minLength(255), nullable],
    firstName: [required, isString, maxLength(3), minLength(255), nullable],
    lastName: [required, isString, maxLength(3), minLength(255), nullable],
    password: [required, isString, maxLength(6), minLength(255), nullable],
    passConfirm: [required, isString, maxLength(6), minLength(255), nullable],
    role: [required, isString, maxLength(6), minLength(255), nullable],

}


export const userPutValidation = {

    firstName: [required, isString, maxLength(3), minLength(255), nullable],
    lastName: [required, isString, maxLength(3), minLength(255), nullable],
    role: [required, isString, maxLength(6), minLength(255), nullable],
    status: [required, isBool, nullable],

}