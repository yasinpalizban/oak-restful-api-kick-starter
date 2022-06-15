import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts"
import i18next from 'https://deno.land/x/i18next/index.js';
import {Status, httpErrors} from "https://deno.land/x/oak/mod.ts";
import {CoreConfig} from "../../../core/config/core.config.ts";

import {SmtpClient} from "https://deno.land/x/smtp/mod.ts";
import * as ejs from "https://deno.land/x/dejs@0.10.2/mod.ts";
import {create} from "https://deno.land/x/djwt@v2.4/mod.ts";
import {DataStoredInToken, TokenData} from "../interfaces/jwt.token.interface.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {authConfig} from "../configs/auth.config.ts";
import {AuthEntity} from "../entities/auth.entity.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {compareDate} from "../../shared/utils/compare.date.ts";
import {getDateNow} from "../../shared/utils/get..date.now.ts";
import {IPermission} from "../interfaces/permission.interface.ts";
import {IUserPermission} from "../interfaces/user.permission.interface.ts";
import {IGroupPermission} from "../interfaces/group.permission.interface.ts";
import {IGroup} from "../interfaces/group.interface.ts";
import {IUserGroup} from "../interfaces/group.user.interface.ts";
import {ILogIn} from "../interfaces/Log.in.interface.ts";
import {RoleType} from "../enums/role.type.enum.ts";
import {sharedConfig} from "../../shared/configs/shared.config.ts";
import {Sms} from "../../shared/libraries/sms.ts";
import {AuthServiceInterface} from "../interfaces/auth.service.interface.ts";
import {
    Membership,
    User,
    Group,
    Permission,
    GroupPermission,
    UserPermission, IpActivity,

} from "../../../core/database/database.relationship.ts";

export default class AuthService implements AuthServiceInterface {
    public userModel = User;
    public groupModel = Group;
    public permissionModel = Permission;
    public userPermissionModel = UserPermission;
    public groupPermissionModel = GroupPermission;
    public ipActivityModel = new IpActivity();
    public userGroupModel = Membership;
    public sms = new Sms(sharedConfig.sms.userName, sharedConfig.sms.password, 0);
    public smtpClient = new SmtpClient();

    constructor() {
    }

    public async signUp(entity: AuthEntity): Promise<IUser> {


        if (isEmpty(entity) || (entity.phone == undefined && entity.email == undefined))
            throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        let findUser: IUser | any;

        if (entity.email !== undefined) {
            findUser = await this.userModel.where({email: entity.email!, username: entity.username!}).get();
            if (findUser) {
                this.ipActivityModel.success = false;
                this.ipActivityModel.type = 'sign-up';
                this.ipActivityModel.login = entity.login!;
                this.ipActivityModel.ipAddress = entity.ip!;
                this.ipActivityModel.userAgent = entity.userAgent!;
                this.ipActivityModel.userId = findUser.id;
                this.ipActivityModel.date = new Date(getDateNow());

                await this.ipActivityModel.save();
                throw new httpErrors.Conflict(i18next.t('auth.youAreEmail'));
            }

            await this.sendActivationEmail(entity.email!, entity.activeToken!);
        }
        if (entity.phone !== undefined) {
            findUser = await this.userModel.where({phone: entity.phone!, username: entity.username!}).get();
            if (findUser) {
                this.ipActivityModel.success = false;
                this.ipActivityModel.type = 'sign-up';
                this.ipActivityModel.login = entity.login!;
                this.ipActivityModel.ipAddress = entity.ip!;
                this.ipActivityModel.userAgent = entity.userAgent!;
                this.ipActivityModel.userId = findUser.id;
                this.ipActivityModel.date = new Date(getDateNow());

                await this.ipActivityModel.save();
                throw new httpErrors.Conflict(i18next.t('auth.yourArePhone'));
            }
            await this.sms.sendActivationCode(entity.phone, CoreConfig.siteAddress);
        }

        const createUser: IUser | any = await this.userModel.create(Object.fromEntries(Object.entries(entity)));

        if (!createUser) throw new httpErrors.Conflict(i18next.t('api.commons.reject'));

        this.ipActivityModel.success = true;
        this.ipActivityModel.type = 'sign-up';
        this.ipActivityModel.login = entity.login!;
        this.ipActivityModel.ipAddress = entity.ip!;
        this.ipActivityModel.userAgent = entity.userAgent!;
        this.ipActivityModel.userId = findUser.id;
        this.ipActivityModel.date = new Date(getDateNow());

        await this.ipActivityModel.save();
        const group: IGroup | any = await this.groupModel.where('name', RoleType.Member).get();
        await this.userGroupModel.create({groupId: group.id, userId: createUser.id});
        return createUser;
    }

    public async signIn(entity: AuthEntity): Promise<ILogIn> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        let findUser: IUser[] | any;

        if (entity.username !== undefined) {

            findUser = await this.userModel.where('username', entity.username).get();

        }
        if (entity.email !== undefined) {
            findUser = await this.userModel.where('email', entity.email).get();
        }
        if (entity.phone !== undefined) {
            findUser = await this.userModel.where('phone', entity.phone).get();
        }


        if (!findUser) {
            this.ipActivityModel.success = false;
            this.ipActivityModel.type = 'sign-in';
            this.ipActivityModel.login = entity.login!;
            this.ipActivityModel.ipAddress = entity.ip!;
            this.ipActivityModel.userAgent = entity.userAgent!;
            this.ipActivityModel.userId = findUser.id;
            this.ipActivityModel.date = new Date(getDateNow());

            await this.ipActivityModel.save();
            throw new httpErrors.Conflict(i18next.t('auth.accountNotExist'));
        }

        const isPasswordMatching: boolean = await bcrypt.compareSync(entity.password!, findUser[0].password!);

        if (!isPasswordMatching) {
            this.ipActivityModel.success = false;
            this.ipActivityModel.type = 'sign-in';
            this.ipActivityModel.login = entity.login!;
            this.ipActivityModel.ipAddress = entity.ip!;
            this.ipActivityModel.userAgent = entity.userAgent!;
            this.ipActivityModel.userId = findUser[0].id;
            this.ipActivityModel.date = new Date(getDateNow());

            await this.ipActivityModel.save();
            throw new httpErrors.Conflict(i18next.t('auth.accountNotExist'));
        }
        if (findUser[0].status == true) {
            this.ipActivityModel.success = false;
            this.ipActivityModel.type = 'sign-in';
            this.ipActivityModel.login = entity.login!;
            this.ipActivityModel.ipAddress = entity.ip!;
            this.ipActivityModel.userAgent = entity.userAgent!;
            this.ipActivityModel.userId = findUser[0].id;
            this.ipActivityModel.date = new Date(getDateNow());

            await this.ipActivityModel.save();
            throw new httpErrors.Conflict(i18next.t('auth.accountBan'));
        }
        if (findUser[0].active == false) {
            this.ipActivityModel.success = false;
            this.ipActivityModel.type = 'sign-in';
            this.ipActivityModel.login = entity.login!;
            this.ipActivityModel.ipAddress = entity.ip!;
            this.ipActivityModel.userAgent = entity.userAgent!;
            this.ipActivityModel.userId = findUser.id;
            this.ipActivityModel.date = new Date(getDateNow());

            await this.ipActivityModel.save();
            throw new httpErrors.Conflict(i18next.t('auth.accountNotConfirm'));
        }

        this.ipActivityModel.success = true;
        this.ipActivityModel.type = 'sign-in';
        this.ipActivityModel.login = entity.login!;
        this.ipActivityModel.ipAddress = entity.ip!;
        this.ipActivityModel.userAgent = entity.userAgent!;
        this.ipActivityModel.userId = findUser.id;
        this.ipActivityModel.date = new Date(getDateNow());

        await this.ipActivityModel.save();

        const userGroup: IUserGroup[] | any = await this.userGroupModel.where('userId', findUser[0].id).get();

        const group: IGroup[] | any = await this.groupModel.where('id', userGroup[0].groupId).get();
        const tokenData: TokenData = await this.createToken(findUser[0], entity.remember ?? false);
        const cookie = this.createCookie(tokenData);
        const permissions: IPermission[] | any = await this.permissionModel.where('active', true).get();
        const permissionUser: IUserPermission[] | any = await this.userPermissionModel.where('userId', findUser[0].id).get();
        const permissionGroup: IGroupPermission[] | any = await this.groupPermissionModel.where('groupId', userGroup[0].groupId).get();

        return {
            cookie: cookie,
            findUser: findUser,
            role: group,
            jwt: tokenData,
            permissions: permissions,
            permissionUser: permissionUser,
            permissionGroup: permissionGroup,
        };
    }

    public async signOut(entity: IUser): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where('id', entity.id).get();
        if (!findUser) throw new httpErrors.Conflict(i18next.t('auth.youAreEmail'));

    }

    public async forgot(entity: AuthEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        let findUser: IUser | any;

        if (entity.username !== undefined) {
            findUser = await this.userModel.where('username', entity.username).get();
            if (!findUser) {
                this.ipActivityModel.success = false;
                this.ipActivityModel.type = 'forgot';
                this.ipActivityModel.login = entity.login!;
                this.ipActivityModel.ipAddress = entity.ip!;
                this.ipActivityModel.userAgent = entity.userAgent!;
                this.ipActivityModel.userId = findUser.id;
                this.ipActivityModel.date = new Date(getDateNow());

                await this.ipActivityModel.save();
                throw new httpErrors.Conflict( i18next.t('auth.youAreNotUserName'));
            }

            if (findUser.email !== undefined) {
                await this.sendForgotEmail(findUser.email, entity.resetToken!);
            } else {
                await this.sms.sendActivationCode(entity.phone!, CoreConfig.siteAddress);
            }
        }
        if (entity.email !== undefined) {
            findUser = await this.userModel.where('email', entity.email).get();
            if (!findUser) {
                this.ipActivityModel.success = false;
                this.ipActivityModel.type = 'forgot';
                this.ipActivityModel.login = entity.login!;
                this.ipActivityModel.ipAddress = entity.ip!;
                this.ipActivityModel.userAgent = entity.userAgent!;
                this.ipActivityModel.userId = findUser.id;
                this.ipActivityModel.date = new Date(getDateNow());

                await this.ipActivityModel.save();
                throw new httpErrors.Conflict( i18next.t('auth.youAreNotEmail'));
            }
            await this.sendForgotEmail(findUser.email, entity.resetToken!);
        }
        if (entity.phone !== undefined) {
            findUser = await this.userModel.where('phone', entity.phone).get();
            if (!findUser) {
                this.ipActivityModel.success = false;
                this.ipActivityModel.type = 'forgot';
                this.ipActivityModel.login = entity.login!;
                this.ipActivityModel.ipAddress = entity.ip!;
                this.ipActivityModel.userAgent = entity.userAgent!;
                this.ipActivityModel.userId = findUser.id;
                this.ipActivityModel.date = new Date(getDateNow());

                await this.ipActivityModel.save();
                throw new httpErrors.Conflict( i18next.t('auth.yourAreNotPhone'));
            }
            await this.sms.sendActivationCode(entity.phone, CoreConfig.siteAddress);
        }
        await this.userModel.where('id', entity.id!).update(Object.fromEntries(Object.entries(entity)));
    }

    public async activationViaEmail(entity: AuthEntity): Promise<true> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where({
            activeToken: entity.activeToken!,
            active: false,
            email: entity.email!,
        }).get();
        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.youAreNotUsername'));
        if (compareDate(findUser.activeExpires, new Date())) throw new httpErrors.Conflict( i18next.t('auth.tokenExpire'));

        await this.userModel.where('id', findUser.id.toString()).update(
            {
                active: true,
                activeToken: null,
                activeExpires: null,
            }
        );
        return true;
    }

    public async sendActivateCodeViaEmail(entity: AuthEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where('email', entity.email!).get();
        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.youAreNotEmail'));
        await this.sendActivationEmail(findUser.email, entity.activeToken!);
        await this.userModel.where('id', findUser.id).update(Object.fromEntries(Object.entries(entity)));
    }

    public async activationViaSms(entity: AuthEntity): Promise<true> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const isValid = await this.sms.isActivationCodeValid(entity.phone!, entity.activeToken!);

        if (!isValid) throw new httpErrors.Conflict( i18next.t('auth.tokenExpire'));

        const findUser: IUser | any = await this.userModel.where({phone: entity.phone!, active: false}).get();
        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.youAreNotAccount'));

        await this.userModel.where('id', findUser.id).update(
            {
                active: true,
                activeToken: null,
                activeExpires: null,
            }
        );
        return true;
    }

    public async sendActivateCodeViaSms(entity: AuthEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where('phone', entity.phone!).get();
        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.youAreNotEmail'));
        await this.sms.sendActivationCode(entity.phone!, CoreConfig.siteAddress);
        await this.userModel.where('id', findUser.id).update(Object.fromEntries(Object.entries(entity)));
    }

    public async resetPasswordViaEmail(entity: AuthEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where('email', entity.email!);
        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.youAreNotEmail'));

        await this.userModel.where('id', findUser.id).update(
            {
                resetAt: entity.resetAt!,
                password: entity.password!,
                resetToken: null,
                resetExpires: null,
            },
        );
    }

    public async resetPasswordViaSms(entity: AuthEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const isValid = await this.sms.isActivationCodeValid(entity.phone!, entity.resetToken!);

        if (!isValid) throw new httpErrors.Conflict( i18next.t('auth.tokenExpire'));

        const findUser: IUser | any = await this.userModel.where('phone', entity.phone!).get();

        if (!findUser) throw new httpErrors.Conflict( i18next.t('auth.yourAreNotPhone'));

        await this.userModel.where('id', findUser.id).update(
            {
                resetAt: entity.resetAt!,
                password: entity.password!,
                resetToken: null,
                resetExpires: null,
            },
        );
    }

    public async createToken(user: IUser, isRemember: boolean): Promise<TokenData> {

        // @ts-ignore
        const key = await crypto.subtle.generateKey(
            { name: "HMAC", hash: "SHA-512" },
            true,
            ["sign"],
        );


        const secretKey: any = CoreConfig.jwt.secretKey;
        const maxAge: number = isRemember ? 2 * authConfig.time.day : 2 * authConfig.time.hour;
        const date = new Date();
        date.setSeconds(maxAge);
        const expire: number = Math.floor(date.getTime() / 1000);
        const token: string = await create({alg: "HS512", typ: "JWT"}, {
            id: user.id,
            exp: maxAge,
        }, key);
        return {expire: expire, maxAge: maxAge, token: token};
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.maxAge};`;
    }

    public async sendForgotEmail(email: string, hash: string): Promise<void> {
        await this.smtpClient.connect({
            hostname: CoreConfig.email.host,
            port: CoreConfig.email.port,
            username: CoreConfig.email.auth.user,
            password: CoreConfig.email.auth.pass
        });
        const mailContext = {
            siteAddress: CoreConfig.siteAddress,
            emailForgotTitle: i18next.t('auth.emailForgotTitle'),
            emailForgotGuide: i18next.t('auth.emailForgotGuide'),
            emailActivateHash: i18next.t('auth.emailActivateHash'),
            hash: hash,
            emailForgotVisit: i18next.t('auth.emailForgotVisit'),
            emailActivateIgnore: i18next.t('auth.emailActivateIgnore'),
            emailForgotResetFrom: i18next.t('auth.emailForgotResetFrom'),
        };
        const template = await ejs.renderFile('./dist/modules/auth/views/forgot.html', mailContext);


        await this.smtpClient.send({
            from: CoreConfig.email.fromEmail,
            to: email,
            subject: CoreConfig.siteAddress + ' (' + i18next.t('api.events.emailForgot') + ')',
            content: "Mail Content",
            html: template.toString(),
        });

        await this.smtpClient.close();

        if (this.smtpClient) {
            throw new httpErrors.Conflict(i18next.t('auth.emailSendErrorActivation'));

        }
    }

    public async sendActivationEmail(email: string, hash: string): Promise<void> {


        const mailContext = {
            siteAddress: CoreConfig.siteAddress,
            emailActivateTitle: i18next.t('auth.emailActivateTitle'),
            emailActivateGuide: i18next.t('auth.emailActivateGuide'),
            emailActivateHash: i18next.t('auth.emailActivateHash'),
            hash: hash,
            emailActivationPage: i18next.t('auth.emailActivationPage'),
            emailActivateIgnore: i18next.t('auth.emailActivateIgnore'),
            emailActivateAccount: i18next.t('auth.emailActivateAccount'),
        };

        const template = await ejs.renderFile('./dist/modules/auth/views/activation.html', mailContext);


        await this.smtpClient.connect({
            hostname: CoreConfig.email.host,
            port: CoreConfig.email.port,
            username: CoreConfig.email.auth.user,
            password: CoreConfig.email.auth.pass
        });

        await this.smtpClient.send({
            from: CoreConfig.email.fromEmail,
            to: email,
            subject: CoreConfig.siteAddress + ' (' + i18next.t('api.events.emailActivation') + ')',
            content: "Mail Content",
            html: template.toString(),
        });

        await this.smtpClient.close();

        if (this.smtpClient) {
            throw new httpErrors.Conflict( i18next.t('auth.emailSendErrorActivation'));

        }
    }
}
