import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ErrorType} from "../enums/error.type.enum.ts";
import {RequestWithUser} from "../interfaces/reqeust.with.user.interface.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";
import {DataStoredInToken} from "../interfaces/jwt.token.interface.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {
    User, Group,
    Permission,
    UserPermission,
    GroupPermission
} from "../../../core/database/database.relationship.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {RoleRouteService} from "../services/role.route.service.ts";
import {IGroup} from "../interfaces/group.interface.ts";
import {ILogIn} from "../interfaces/Log.in.interface.ts";
import {IPermission} from "../interfaces/permission.interface.ts";
import {routeController} from "../utils/route.controller.ts";
import {IUserPermission} from "../interfaces/user.permission.interface.ts";
import {IGroupPermission} from "../interfaces/group.permission.interface.ts";
import {verify, decode} from "https://deno.land/x/djwt@v2.4/mod.ts";

export const authMiddleware = async (context: RequestWithUser , next: () => Promise<unknown>) => {
    try {

        const Authorization = await context.request.headers.get('Authorization')?.split('Bearer ')[1] || await context.cookies.get('Authorization') || null;

        if (isEmpty(Authorization!)) {

            context.response.status = Status.Unauthorized;
            context.response.headers.set("Content-Type", "application/json");
            return context.response.body = {
                error: i18next.t('middleWear.authToken'),
                type: ErrorType.Login,
            };
        }

        const ruleRoute = new RoleRouteService();
        const secretKey: any = CoreConfig.jwt.secretKey;
        // @ts-ignore
        const key = await crypto.subtle.generateKey(
            {name: "HMAC", hash: "SHA-512"},
            true,
            [ "verify"],
        );

         // await verify(Authorization!, key);
        const [header, payload, signature] = decode(Authorization!);
        // @ts-ignore
        const userId = payload.id;

        const findUser: IUser[] | any = await User.where('id', userId).get();

        if (isEmpty(findUser)) {
            context.response.status = Status.NotModified;
            context.response.headers.set("Content-Type", "application/json");
            return context.response.body = {
                error: i18next.t('middleWear.youAlreadySignedIn'),
                type: ErrorType.Login,
            };
        }

        const group: IGroup = await Group.getUserForGroup(findUser[0].id);

        const userLoggedIn: ILogIn = {
            findUser: findUser[0],
            role: group
        };


        context.user = userLoggedIn;


        const controllerName = routeController(context.request.url.pathname);
        const permissions: IPermission | any = await Permission.where({active: true, name: controllerName});

        if (isEmpty(permissions)) {
            const controllerRole: [] | null = ruleRoute.getRoleAccess(controllerName);

            if (controllerRole == null) {
                return next();
            }
            for (const role of controllerRole) {
                if (role == findUser[0].role.name) {
                    return next();
                }
            }
        } else {
            const typeMethod = context.request.method;
            const userPermission: IUserPermission[] | any = await UserPermission.where({
                permissionId: permissions.id,
                userId: findUser.id
            }).get();
            const groupPermission: IGroupPermission[] | any = await GroupPermission.where({
                permissionId: permissions.id,
                groupId: group.id
            }).get();

            for (const isUser of userPermission) {
                if (isUser.userId == userLoggedIn.findUser.id && isUser.actions.search(typeMethod.toLowerCase()) !== -1) {
                    return next();
                }
            }

            for (const isGroup of groupPermission) {
                if (isGroup.groupId == userLoggedIn?.role?.id && isGroup.actions.search(typeMethod.toLowerCase()) !== -1) {
                    return next();
                }
            }
        }

        context.response.status = Status.Unauthorized;
        ;
        context.response.headers.set("Content-Type", "application/json");
        return context.response.body = {
            error: i18next.t('middleWear.notEnoughPrivilege'),
            type: ErrorType.Login,
        };
    } catch (error) {

        context.response.status = Status.Unauthorized;
        context.response.headers.set("Content-Type", "application/json");
        return context.response.body = {
            error: i18next.t('middleWear.wrongAuth'),
            type: ErrorType.Login,
        };
    }
};


