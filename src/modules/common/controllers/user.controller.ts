import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import UserService from "../services/user.service.ts";
import {IUser, IUserPagination} from "../../auth/interfaces/user.interface.ts";
import {UserEntity} from "../entities/user.entity.ts";

export class UserController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const userService = new UserService();
        const urlAggregation = new UrlAggregation(context.request.url.search);
        const data: IUserPagination = await userService.index(urlAggregation);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            ...data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }


    async show(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        // @ts-ignore
        const id: number = +context?.params?.id;
        const userService = new UserService();
        const data: IUser = await userService.show(id);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const result = context.request.body();
        const userEntity = new UserEntity(await result.value);
        await userEntity.createNow().activate().generatePasswordHash();
        const userService = new UserService();
        await userService.create(userEntity);

        context.response.status = Status.Created;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.commons.create'),
        };

    }

    async update(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        // @ts-ignore
        const id: number = +context?.params?.id;
        const result = context.request.body();
        const userEntity = new UserEntity(await result.value);
        userEntity.updateNow();
        const userService = new UserService();
        await userService.update(id, userEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.update'),
        };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const userService = new UserService();

        // @ts-ignore
        const id: number = +context?.params?.id;
        await userService.delete(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.delete'),
        };

    }
}