import {  Context } from "https://deno.land/x/oak/mod.ts";

const loggerMiddleware = async (context: Context, next: () => Promise<unknown>) => {
    await next();
    const reqTime = context.response.headers.get("X-Response-Time");
    const status = context.response.status;
    console.log(
        ` ${context.request.method} ${context.request.url} - ${reqTime} status: ${status}`,
    );
};

export default loggerMiddleware;