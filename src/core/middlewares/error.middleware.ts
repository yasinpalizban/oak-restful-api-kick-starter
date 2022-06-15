import {
    Context,
    HttpError,
    isHttpError,
    Status,
} from "https://deno.land/x/oak/mod.ts";
import {CoreConfig} from "../config/core.config.ts";
import {config} from "https://deno.land/x/dotenv/mod.ts";

const errorMiddleware = async (context: Context, next: () => Promise<unknown>) => {
    try {
        await next();
    } catch (err) {

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

        context.response.status = status;
        context.response.body = {status, message};

    }
};

export default errorMiddleware;
