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

export const groupValidation = {
    name: [required, isString,  maxLength(255), minLength(6)],
    description: [required, isString,  maxLength(255), minLength(6)],

}