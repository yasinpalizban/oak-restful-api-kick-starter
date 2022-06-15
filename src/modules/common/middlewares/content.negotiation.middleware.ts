import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ErrorType} from "../../auth/enums/error.type.enum.ts";
import {LanguageType} from "../../shared/enum/language.enum.ts";

const contentNegotiationMiddleware = async (context: Context, next: () => Promise<unknown>) => {

    const lang: string |undefined  = context.request.acceptsLanguages(LanguageType.En, LanguageType.Fa);
    const char: string |undefined  = context.request.acceptsCharsets('utf-8');
    const encode: string |undefined = context.request.acceptsEncodings('gzip');

    //  if (lang == undefined) {
    //
    //      context.response.status = Status.Unauthorized;
    //      context.response.headers.set("Content-Type", "application/json");
    //      return context.response.body = {
    //          error: i18next.t('middleWear.contentLang'),
    //          type: ErrorType.DataInput,
    //      };
    // }
    //
    // if (char == undefined) {
    //
    //     context.response.status = Status.Unauthorized;
    //     context.response.headers.set("Content-Type", "application/json");
    //     return context.response.body = {
    //         error: i18next.t('middleWear.contentChar'),
    //         type: ErrorType.DataInput,
    //     };
    // }
    //
    // if ( encode==  undefined) {
    //
    //     context.response.status = Status.Unauthorized;
    //     context.response.headers.set("Content-Type", "application/json");
    //     return context.response.body = {
    //         error: i18next.t('middleWear.contentEncode'),
    //         type: ErrorType.DataInput,
    //     };
    // }

    // switch (req.accepts(["json", "html"])) {
    //   case "json":
    //     res.setHeader("Content-Type", "application/json");
    //     res.write(JSON.stringify({ hello: "world"));
    //     break;
    //   case "html":
    //     res.setHeader("Content-Type", "text/html");
    //     res.write("<b>hello, world</b>");
    //     break;
    //   default:
    //     res.setHeader("Content-Type", "text/plain");
    //     res.write("hello, world");
    //     break;
    // }
        await next();

};

export default contentNegotiationMiddleware;