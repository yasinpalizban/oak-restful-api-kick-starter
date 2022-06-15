import ApiController from "../../shared/controllers/api.controller.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";

export default class GraphController extends ApiController {

  async index(context: Context, next: () => Promise<unknown>): Promise<void | Response> {


    const chartBarV: any = [
      { name: 'Mobiles', value: 105000 },
      { name: 'Laptop', value: 55000 },
      { name: 'AC', value: 15000 },
      { name: 'Headset', value: 150000 },
      { name: 'Fridge', value: 20000 },
    ];

    const pieChart: any = [
      { name: 'Mobiles', value: 105000 },
      { name: 'Laptop', value: 55000 },
      { name: 'AC', value: 15000 },
      { name: 'Headset', value: 150000 },
      { name: 'Fridge', value: 20000 },
    ];
    const pieGrid: any = [
      { name: 'Mobiles', value: 8000 },
      { name: 'Laptop', value: 5600 },
      { name: 'AC', value: 5500 },
      { name: 'Headset', value: 15000 },
      { name: 'Fridge', value: 2100 },
    ];

    context.response.status = Status.OK;
    context.response.headers.set("Content-Type", "application/json");
    context.response.body = {
      pieGrid: pieGrid,
      pieChart: pieChart,
      chartBar: chartBarV,
      statusMessage: i18next.t('api.commons.receive'),
    };

  }
}
