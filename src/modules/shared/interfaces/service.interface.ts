import {UrlAggregation} from "../libraries/urlAggregation.ts";


export declare interface ServiceInterface {

  index?(urlAggregation?: UrlAggregation): Promise<any[] | any>;

  show?(id: number): Promise<any>;

  create?(data: any): Promise<void | any>;

  update?(id: number, data: any): Promise<void | any>;

  delete?(id: number, foreignKey?: string): Promise<void>;
}


