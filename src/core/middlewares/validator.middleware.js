import { validate, } from "https://deno.land/x/validasaur/mod.ts";
import { httpErrors } from "https://deno.land/x/oak/mod.ts";
import { getErrorValidation } from "../utils/get.error.validation.ts";
/**
 * request validation middleware
 * validate request body with given validation rules
 */
export const validatorMiddleware = ({ bodyRules }) => {
    return async (context, next) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0b3IubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxHQUFtQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBQyxVQUFVLEVBQVUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNuRSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRTs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQUMsU0FBUyxFQUFpQyxFQUFFLEVBQUU7SUFFL0UsT0FBTyxLQUFLLEVBQUUsT0FBZ0IsRUFBRSxJQUE0QixFQUFFLEVBQUU7UUFDNUQsdUJBQXVCO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxzQ0FBc0M7UUFFN0UsTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pDLGtCQUFrQjtRQUNsQixNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsOENBQThDO1lBQzlDLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNDLE1BQU0sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMifQ==