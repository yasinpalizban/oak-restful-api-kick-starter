//import { Op } from 'sequelize';
import {SearchFunctionType} from "../enum/search.function.ts";
import {AggregatePipeLine} from "../interfaces/urlAggregationInterface.ts";

export function convertSignType(sign: string | string[], value: number | string | string[] | number[]): any {
    // switch (sign) {
    //   case '!=':
    //     return { [Op.ne]: value };
    //   case '>':
    //     return { [Op.gt]: value };
    //   case '=>':
    //     return { [Op.gte]: value };
    //   case '<':
    //     return { [Op.lt]: value };
    //   case '=<':
    //     return { [Op.lte]: value };
    //   default:
    //     return { [Op.eq]: value };
    // }
    return '';
}

export function convertFunctionType(name: string): string {
    switch (name) {
        case 'orWhere':
            return SearchFunctionType.orWhere;
        case 'whereNotIn':
            return SearchFunctionType.whereNoTIn;
        case 'whereIn':
            return SearchFunctionType.whereIn;
        case 'like':
            return SearchFunctionType.like;
        default:
            return SearchFunctionType.where;
    }
}

export function parseString(str: string): string {
    // %
    while (true) {
        str = decodeURIComponent(str);
        if (str.indexOf('%') == -1) {
            break;
        }
    }

    return str;
}

export function changeKeyObject(obj: object, oldKey: string, newKey: string): object {
    return JSON.parse(JSON.stringify(obj).split(oldKey).join(newKey));
}

export function comparePipeLine(key: string, pipeline: AggregatePipeLine[], defaultPipeLine: AggregatePipeLine[]) {
    pipeline.forEach(p => {
        // @ts-ignore
        if (p[key]) {
            defaultPipeLine.forEach(dp => {
                // @ts-ignore
                if (dp[key]) {
                }
            });
        }
    });
}
