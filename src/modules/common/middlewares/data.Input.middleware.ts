import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ErrorType} from "../../auth/enums/error.type.enum.ts";

const dataInputMiddleware = async (context: Context, next: () => Promise<unknown>) => {


    const method: string = context.request.method.toLowerCase();
    if (method == 'post' || method == 'put') {

        const result = context.request.body();
        if (result.type != "json" && result.type != "form-data") {

            context.response.status = Status.Unauthorized;
            context.response.headers.set("Content-Type", "application/json");
            return context.response.body = {
                error: i18next.t('middleWear.dataInput'),
                type: ErrorType.DataInput,
            };
        } else {
            await next();
        }
    } else {
        await next();
    }
};

export default dataInputMiddleware;