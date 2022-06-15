import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import SettingService from "../services/setting.service.ts";
import {ISetting, ISettingPagination} from "../interfaces/setting.interface.ts";
import {SettingEntity} from "../entities/setting.entity.ts";


export class SettingController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const settingService = new SettingService();
        const urlAggregation = new UrlAggregation(context.request.url.search);
        const data: ISettingPagination = await settingService.index(urlAggregation);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = data;
        context.response.body = {
            ...data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }


    async show(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        // @ts-ignore
        const id: number = +context?.params?.id;
        const settingService = new SettingService();
        const data: ISetting = await settingService.show(id);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            data,
            statusMessage: i18next.t('api.commons.receive'),
        };

    }

    async create(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        const result = context.request.body();
        const settingEntity = new SettingEntity(await result.value);
        settingEntity.createNow();
        const settingService = new SettingService();
        await settingService.create(settingEntity);

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
        const settingEntity = new SettingEntity(await result.value);
        settingEntity.updateNow()
        const settingService = new SettingService();
        await settingService.update(id, settingEntity);

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.update'),
        };

    }

    async delete(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

        const settingService = new SettingService();
        // @ts-ignore
        const id: number = +context?.params?.id;
        await settingService.delete(id);
        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.delete'),
        };

    }
}