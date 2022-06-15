import {ValidationErrors} from "https://deno.land/x/validasaur/mod.ts";

/**
 * get single error message from errors
 */
export function getErrorValidation(errors: ValidationErrors): string | undefined  {
    for (let attr in errors) {
        const attrErrors = errors[attr];
        for (let rule in attrErrors) {
            return attrErrors[rule] as string;
        }
    }
};