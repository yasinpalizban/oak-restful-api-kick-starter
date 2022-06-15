import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import { Status } from "https://deno.land/x/oak/mod.ts";
export class IndexController extends ApiController {
    async index(context, next) {
        try {
            context.response.status = Status.OK;
            context.response.headers.set("Content-Type", "application/json");
            context.response.body = {
                ss: 'sds',
                statusMessage: i18next.t('api.commons.receive'),
            };
        }
        catch (error) {
            await next();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUFhLE1BQU0sNENBQTRDLENBQUM7QUFDdkUsT0FBTyxPQUFPLE1BQU0sc0NBQXNDLENBQUM7QUFDM0QsT0FBTyxFQUF3QixNQUFNLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RSxNQUFNLE9BQU8sZUFBaUIsU0FBUyxhQUFhO0lBRWhELEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBZ0IsRUFBRSxJQUE0QjtRQUN0RCxJQUFJO1lBR0EsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNyQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7WUFDaEUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUc7Z0JBQ3BCLEVBQUUsRUFBQyxLQUFLO2dCQUNSLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO2FBQ2xELENBQUM7U0FDTDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztDQUdKIn0=