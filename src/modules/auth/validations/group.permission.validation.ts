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

export const groupPermissionValidation = {
    groupId: [required, isNumber],
    permissionId: [required, isNumber],
    actions: [required, isString,  maxLength(255), minLength(6)],

}