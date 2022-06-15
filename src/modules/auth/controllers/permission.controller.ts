import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import PermissionService from "../services/permission.service.ts";
import {IPermission, IPermissionPagination} from "../interfaces/permission.interface.ts";
import {PermissionEntity} from "../entities/permission.entity.ts";

export class PermissionController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const permissionService = new PermissionService();
        const urlAggregation = new UrlAggregation(context.request.url.search);
        const data: IPermissionPagination = await permissionService.index(urlAggregation);
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
        const permissionService = new PermissionService();
        const data: IPermission = await permissionService.show(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const result = context.request.body();
        const permissionEntity = new PermissionEntity(await result.value);
        const permissionService = new PermissionService();
        await permissionService.create(permissionEntity);

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
        const permissionEntity = new PermissionEntity(await result.value);
        const permissionService = new PermissionService();
        await permissionService.update(id, permissionEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.update'),
        };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const permissionService = new PermissionService();

        // @ts-ignore
        const id: number = +context?.params?.id;
        await permissionService .delete(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.delete'),
        };

    }
}