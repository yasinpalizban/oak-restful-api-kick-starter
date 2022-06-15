import {  Context } from "https://deno.land/x/oak/mod.ts";

const timingMiddleware = async (context:  Context, next: () => Promise<unknown>) => {

    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    context.response.headers.set("X-Response-Time", `${ms}ms`);
}

export default timingMiddleware;