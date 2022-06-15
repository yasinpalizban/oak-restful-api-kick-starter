import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ErrorType} from "../enums/error.type.enum.ts";
import {RequestWithUser} from "../interfaces/reqeust.with.user.interface.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";
import {DataStoredInToken} from "../interfaces/jwt.token.interface.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {
    User
} from "../../../core/database/database.relationship.ts";
import {verify, decode} from "https://deno.land/x/djwt@v2.4/mod.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";

const isSignInMiddleware = async (context: RequestWithUser | Context, next: () => Promise<unknown>) => {
    const Authorization = await context.request.headers.get('Authorization')?.split('Bearer ')[1] || await context.cookies.get('Authorization') || null;
    if (isEmpty(Authorization!)) {
        const secretKey: any = CoreConfig.jwt.secretKey;

        // @ts-ignore
        const key = await crypto.subtle.generateKey(
            {name: "HMAC", hash: "SHA-512"},
            true,
            [ "verify"],
        );
        //  const verificationResponse: DataStoredInToken | any = await verify(Authorization!, key);
        const [header, payload, signature] = decode(Authorization!);
        // @ts-ignore
        const userId = payload.id;

        const findUser: IUser | any = await User.where('id', userId).get();

        if (isEmpty(findUser)) {
            context.response.status = Status.NotModified;
            context.response.headers.set("Content-Type", "application/json");
            return context.response.body = {
                error: i18next.t('middleWear.youAlreadySignedIn'),
                type: ErrorType.Login,
            };
        } else {
            await next();
        }
    } else {
        await next();
    }


}

export default isSignInMiddleware;