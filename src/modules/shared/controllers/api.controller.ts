import {Context, Response,  Status} from "https://deno.land/x/oak/mod.ts";
import {ApiFunctionInterface} from "../interfaces/api.function.interface.ts";
import {StatusCodes} from 'https://deno.land/x/https_status_codes/mod.ts';
import i18next from 'https://deno.land/x/i18next/index.js';

class ApiController implements ApiFunctionInterface {

    async all(context: Context, next: any): Promise<void | Response> {


        context.response.status =  Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.index'),
        };
    }

    async index(context: Context, next: any): Promise<void | Response> {

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.index'),
        };
    }

    async show(context: Context, next: any): Promise<void | Response> {

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.show'),
        };
    }

    async create(context: Context, next: any): Promise<void | Response> {

        context.response.status = Status.Created;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.create'),
        };
    }

    async update(context: Context, next: any): Promise<void | Response> {

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.update'),
        };
    }

    async delete(context: Context, next: any): Promise<void | Response> {

        context.response.status = Status.OK;
        context.response.headers.set("Content-Type", "application/json")
        context.response.body = {
            statusMessage: i18next.t('api.errors.rest.delete'),
        };
    }
}

export default ApiController;
