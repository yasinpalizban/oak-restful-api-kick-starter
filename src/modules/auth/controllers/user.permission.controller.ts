import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {IUserPermission, IUserPermissionPagination} from "../interfaces/user.permission.interface.ts";
import UserPermissionService from "../services/user.permission.service.ts";
import {UserPermissionEntity} from "../entities/user.permission.entity.ts";

export class UserPermissionController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const userPermissionService = new UserPermissionService();
        const urlAggregation = new UrlAggregation(context.request.url.search);
        const data: IUserPermissionPagination = await userPermissionService.index(urlAggregation);
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
        const userPermissionService = new UserPermissionService();
        const data: IUserPermission = await userPermissionService.show(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const result = context.request.body();
        const userPermissionEntity = new UserPermissionEntity(await result.value);
        const userPermissionService = new UserPermissionService();
        await userPermissionService.create(userPermissionEntity);

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
        const userPermissionEntity = new UserPermissionEntity(await result.value);
        const userPermissionService = new UserPermissionService();
        await userPermissionService.update(id, userPermissionEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.update'),
        };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const userPermissionService = new UserPermissionService();

        // @ts-ignore
        const id: number = +context?.params?.id;
        await userPermissionService .delete(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.delete'),
        };

    }
}