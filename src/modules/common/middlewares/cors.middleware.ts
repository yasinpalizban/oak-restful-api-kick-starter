import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";

const corsMiddleware = async (context: Context, next: () => Promise<unknown>) => {


    const allowedDomains = ['http://localhost:4200', 'https://x.ir', 'https://www.x.ir'];

    if (allowedDomains.indexOf(context.request.headers.get('origin')!) !== -1) {
        const index: number = allowedDomains.indexOf(context.request.headers.get('origin')!);
        context.response.headers.set('Access-Control-Allow-Origin', allowedDomains[index]);
    }

    context.response.headers.set(
        'Access-Control-Allow-Headers',
        'Origin, X-API-KEY, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Allow-Headers, Authorization, observe, enctype, Content-Length, X-Csrf-Token',
    );
    context.response.headers.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    context.response.headers.set('Access-Control-Allow-Credentials', 'true');
    context.response.headers.set('Access-Control-Max-Age', '3600');

    //  if (context.request.url.href.search(/public/gi) == -1) {
    //     context.response.headers.set('content-type', 'application/json; charset=utf-8');
    //  }

    const method = context.request.method;

    if (method == 'OPTIONS') {
        //context.response.headers.set("HTTP/1.1 200 OK CORS");
        return context.response.status = Status.OK;
    }
    await next();
};

export default corsMiddleware;