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

export const settingPostValidation = {
    key: [required, isString, maxLength(255), minLength(3)],
    value: [required, isString, maxLength(255), minLength(3)],
    description: [required, isString,maxLength(255), minLength(3)],
    status: [required, isBool],
}

export const settingPutValidation = {
    value: [required, isString, maxLength(255), minLength(3)],
    description: [required, isString,maxLength(255), minLength(3)],
    status: [required, isBool],
}