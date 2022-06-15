import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, State, Status} from "https://deno.land/x/oak/mod.ts";
import {AuthControllerInterface} from "../interfaces/auth.controller.interface.ts";
import {AuthEntity} from "../entities/auth.entity.ts";
import AuthService from "../services/auth.service.ts";
import {authConfig} from "../configs/auth.config.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {RequestWithUser} from "../interfaces/reqeust.with.user.interface.ts";
import {ILogIn} from "../interfaces/Log.in.interface.ts";


export default class AuthController implements AuthControllerInterface {


    public signUp = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);


        await authEntity.signUpMode().createNow().generateActivateToken().activateExpiration().generatePasswordHash();

        authEntity.action;

        const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${authConfig.captcha.secretKey}&response=${
            authEntity.token
        }&remoteip=${context.request.ip}}`;

        const captchaResponse = await fetch(captchaUrl);
        const data = await captchaResponse.json();

        if (data.success == false) {


            context.response.status = Status.Unauthorized;
            context.response.headers.set("Content-Type", "application/json")
            context.response.body = {
                statusMessage: i18next.t('auth.youAreRobot'),

            };
        }

        delete authEntity.token;
        delete authEntity.action;


        authEntity.userAgent = context.request.headers.get("user-agent") || "Unknown";
        authEntity.ip = context.request.ip;

        const authService = new AuthService();

        const signUpUserData: IUser = await authService.signUp(authEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.singUp'),
            data: signUpUserData,
        };
    };


    public signIn = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        authEntity.logInMode();

        authEntity.userAgent = context.request.headers.get("user-agent") || "Unknown";
        authEntity.ip = context.request.ip;
        const authService = new AuthService();
        const isLogIn: ILogIn = await authService.signIn(authEntity);

       // context.cookies.set('Set-Cookie', isLogIn.cookie);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body =
            {
                statusMessage: i18next.t('auth.singIn'),
                permissions: isLogIn.permissions,
                permissionGroup: isLogIn.permissionGroup,
                permissionUser: isLogIn.permissionUser,
                userInformation: isLogIn.findUser,
                role: isLogIn.role,
                jwt: isLogIn.jwt,
            }
    };

    public signOut = async function (context: RequestWithUser, next: () => Promise<unknown>): Promise<void | Response> {
        const userData: IUser | undefined = context?.user?.findUser;
        const authService = new AuthService();
        await authService.signOut(userData!);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.singOut'),
        };
    };


    public activationViaEmail = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        authEntity.activate();
        const authService = new AuthService();
        await authService.activationViaEmail(authEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.accountActivate'),
        };
    }
    public sendActivateCodeViaEmail = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        authEntity.generateActivateToken().activateExpiration().deActivate();
        const authService = new AuthService();
        await authService.sendActivateCodeViaEmail(authEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.emailActivationSend'),
        };
    };

    public activationViaSms = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        authEntity.activate();
        const authService = new AuthService();
        await authService.activationViaSms(authEntity);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.accountActivate'),
        }
    };

    public sendActivateCodeViaSms = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        authEntity.activateExpiration().generateActivateToken();
        const authService = new AuthService();
        await authService.sendActivateCodeViaSms(authEntity);
        context.response.status = Status.Created;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.smsActivationSend'),
        };
    };

    public forgot = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);

        authEntity.logInMode().resetNow().resetExpiration().generateRestToken();
        const authService = new AuthService();

        authEntity.action;

        const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${authConfig.captcha.secretKey}&response=${
            authEntity.token
        }&remoteip=${context.request.ip}`;

        const captchaResponse = await fetch(captchaUrl);
        const data = await captchaResponse.json();

        if (data.success == false) {


            context.response.status = Status.Unauthorized;
            context.response.headers.set("Content-Type", "application/json")
            context.response.body = {
                statusMessage: i18next.t('auth.youAreRobot'),
            };
        }
        delete authEntity.token;
        delete authEntity.action;

        authEntity.userAgent = context.request.headers.get("user-agent") || "Unknown";
        authEntity.ip = context.request.ip;
        await authService.forgot(authEntity);


        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.resetPasswordDone'),
        };
    };

    public resetPasswordViaEmail = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        await authEntity.resetNow().generatePasswordHash();
        const authService = new AuthService();
        await authService.resetPasswordViaEmail(authEntity);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.forgotDone'),
        };
    };


    public resetPasswordViaSms = async function (context: Context, next: () => Promise<unknown>): Promise<void | Response> {
        const result = context.request.body();
        const authEntity = new AuthEntity(await result.value);
        await authEntity.resetNow().generatePasswordHash();
        const authService = new AuthService();
        await authService.resetPasswordViaSms(authEntity);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('auth.resetPasswordDone'),
        };
    };
}
