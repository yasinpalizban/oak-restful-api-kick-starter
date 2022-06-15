import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ErrorType} from "../../auth/enums/error.type.enum.ts";

const urlMiddleware = async (context: Context, next: () => Promise<unknown>) => {

    if (context.request.url.href.search(/api/gi) == -1) {

        context.response.status = Status.Unauthorized;
        context.response.headers.set("Content-Type", "application/json");
        return context.response.body = {
            error: i18next.t('middleWear.url'),
            type: ErrorType.Url,
        };


    } else {
        await next();
    }
};

export default urlMiddleware;