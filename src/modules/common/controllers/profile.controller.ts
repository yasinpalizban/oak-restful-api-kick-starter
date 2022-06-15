import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {RequestWithUser} from "../../auth/interfaces/reqeust.with.user.interface.ts";
import {ILogIn} from "../../auth/interfaces/Log.in.interface.ts";
import ProfileService from "../services/profile.service.ts";
import {IUser} from "../../auth/interfaces/user.interface.ts";
import {UserEntity} from "../entities/user.entity.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {commonConfig} from "../configs/common.config.ts";

export class ProfileController extends ApiController {

    async index(context: RequestWithUser, next: () => Promise<unknown>): Promise<void | Response> {

        const user: ILogIn| undefined = context?.user;
        const profileService = new ProfileService();
        const findOneData: IUser = await profileService.show(user?.findUser?.id!);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data:findOneData,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async post(context: RequestWithUser, next: () => Promise<unknown>): Promise<void | Response> {

        const user: ILogIn| undefined = context?.user;
        const result = context.request.body();
        const userEntity = new UserEntity(await result.value);
        await userEntity.updateNow().generatePasswordHash();
        const profileService = new ProfileService();
        await profileService.update(user?.findUser?.id!, userEntity);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.save'),
        };

    }


}