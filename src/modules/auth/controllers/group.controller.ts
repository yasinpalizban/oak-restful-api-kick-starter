import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import GroupService from "../services/group.service.ts";
import {GroupEntity} from "../entities/group.entity.ts";
import {IGroup, IGroupPagination} from "../interfaces/group.interface.ts";

export class GroupController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


            const  groupService = new GroupService();
            const urlAggregation = new UrlAggregation(context.request.url.search);
            const data: IGroupPagination = await groupService.index(urlAggregation);
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
            const groupService = new GroupService();
            const data: IGroup = await groupService.show(id);

            context.response.status = Status.OK;
            context.response.headers.set("Content-Type", "application/json")
            context.response.body = {
                data,
                statusMessage: i18next.t('api.commons.receive'),
            };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


            const result = context.request.body();
            const groupEntity = new GroupEntity(await result.value);
            const groupService = new GroupService();
            await groupService.create(groupEntity);

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
            const groupEntity = new GroupEntity(await result.value);
            const groupService = new GroupService();
            await groupService.update(id,groupEntity);

            context.response.status = Status.OK;
            context.response.headers.set("Content-Type", "application/json")
            context.response.body = {
                statusMessage: i18next.t('api.commons.update'),
            };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

            const groupService = new GroupService();

            // @ts-ignore
            const id: number = +context?.params?.id;
            await groupService.delete(id);

            context.response.status = Status.OK;
            context.response.headers.set("Content-Type", "application/json")
            context.response.body = {
                statusMessage: i18next.t('api.commons.delete'),
            };

    }
}