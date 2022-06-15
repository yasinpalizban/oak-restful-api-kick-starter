import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import GroupPermissionService from "../services/group.permission.service.ts";
import {IGroupPermission, IGroupPermissionPagination} from "../interfaces/group.permission.interface.ts";
import {GroupPermissionEntity} from "../entities/group.permission.entity.ts";
import {RequestWithUser} from "../interfaces/reqeust.with.user.interface.ts";

export class GroupPermissionController extends ApiController {

    async index(context: RequestWithUser, next: () => Promise<unknown>): Promise<void | Response> {


        const groupPermissionService = new GroupPermissionService();
        const urlAggregation = new UrlAggregation(context.request.url.search);
        const data: IGroupPermissionPagination = await groupPermissionService.index(urlAggregation);
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
        const groupPermissionService = new GroupPermissionService();
        const data: IGroupPermission[] = await groupPermissionService.show(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const result = context.request.body();
        const groupPermissionEntity = new GroupPermissionEntity(await result.value);
        const groupPermissionService = new GroupPermissionService();
        await groupPermissionService.create(groupPermissionEntity);

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
        const groupPermissionEntity = new GroupPermissionEntity(await result.value);
        const groupPermissionService = new GroupPermissionService();
        await groupPermissionService.update(id, groupPermissionEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.update'),
        };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const groupPermissionService = new GroupPermissionService();

        // @ts-ignore
        const id: number = +context?.params?.id;
        await groupPermissionService .delete(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.delete'),
        };

    }
}