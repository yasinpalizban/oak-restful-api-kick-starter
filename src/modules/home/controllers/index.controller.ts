import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";

export class IndexController extends ApiController {

    async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json");
        context.response.body = {
            statusMessage: i18next.t('api.commons.receive'),
        };



    }

    async post(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.commons.save'),
        };

    }


}