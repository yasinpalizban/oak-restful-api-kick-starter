import { isHttpError, Status, } from "https://deno.land/x/oak/mod.ts";
import { CoreConfig } from "../config/core.config.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const errorMiddleware = async (ctx, next) => {
    try {
        await next();
    }
    catch (err) {
        let message = err.message;
        const status = err.status || err.statusCode || Status.InternalServerError;
        /**
         * considering all unhandled errors as internal server error,
         * do not want to share internal server errors to
         * end user in non "development" mode
         */
        const environmentMode = config().environment ? config().environment : CoreConfig.environment;
        if (!isHttpError(err)) {
            message = environmentMode == "development" ? message : "Internal Server Error";
        }
        if (environmentMode == "development") {
            console.log(err);
        }
        ctx.response.status = status;
        ctx.response.body = { status, message };
    }
};
export default errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdILFdBQVcsRUFDWCxNQUFNLEdBQ1QsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN4QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRXpELE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBNEIsRUFBRSxFQUFFO0lBQ3pFLElBQUk7UUFDQSxNQUFNLElBQUksRUFBRSxDQUFDO0tBQ2hCO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFFVixJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzFCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFFMUU7Ozs7V0FJRztRQUNILE1BQU0sZUFBZSxHQUFHLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1FBRTdGLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbkIsT0FBTyxHQUFHLGVBQWUsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDbEY7UUFHRCxJQUFJLGVBQWUsSUFBSSxhQUFhLEVBQUU7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUMsQ0FBQztLQUV6QztBQUNMLENBQUMsQ0FBQztBQUVGLGVBQWUsZUFBZSxDQUFDIn0=