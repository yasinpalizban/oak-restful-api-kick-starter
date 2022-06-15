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

export const profileValidation = {
    country: [ isString, maxLength(25), minLength(3), nullable],
    city: [ isString, maxLength(255), minLength(3), nullable],
    address: [ isString, maxLength(255), minLength(3), nullable],
    firstName: [ isString, maxLength(255), minLength(3), nullable],
    lastName: [ isString, maxLength(255), minLength(3), nullable],
    password: [ isString, maxLength(255), minLength(6), nullable],
    passConfirm: [ isString, maxLength(255), minLength(6), nullable],
    image: [ isString, minLength(1), nullable],
    gender: [ isString, minLength(1), nullable],
}