import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {IUserPagination} from "../../auth/interfaces/user.interface.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";

export default class OverViewController extends ApiController {


  async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {

    const urlQueryParam = new UrlAggregation(null);
  //  const userService = new UserService();
  //  const user: IUserPagination = await userService.index(urlQueryParam);

    context.response.status = Status.OK;
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = {
  //    user: user,
      statusMessage: i18next.t('api.commons.receive'),
    };

  }
}
