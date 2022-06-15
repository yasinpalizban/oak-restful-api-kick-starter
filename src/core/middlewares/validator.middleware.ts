import {validate, ValidationRules,} from "https://deno.land/x/validasaur/mod.ts";
import {httpErrors, Context} from "https://deno.land/x/oak/mod.ts";
import {getErrorValidation} from "../utils/get.error.validation.ts";
/**
 * request validation middleware
 * validate request body with given validation rules
 */
export const validatorMiddleware = ({bodyRules}: { bodyRules: ValidationRules }) => {

    return async (context: Context, next: () => Promise<unknown>) => {
        /** get request body */
        const result = context.request.body(); // content type automatically detected

        const value = await result.value;
        /** check rules */
        const [isValid, errors] = await validate(value, bodyRules);
        if (!isValid) {
            /** if error found, throw bad request error */
            const message = getErrorValidation(errors);
            throw new httpErrors.BadRequest(message);
        }
        await next();
    };
};

