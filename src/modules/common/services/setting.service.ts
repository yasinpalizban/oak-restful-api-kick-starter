import {Status, httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";

import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {Setting} from "../../../core/database/database.relationship.ts";
import {ISetting, ISettingPagination} from "../interfaces/setting.interface.ts";
import {SettingEntity} from "../entities/setting.entity.ts";

export default class SettingService implements ServiceInterface {
    public settingModel = Setting;

    public async index(urlAggregation: UrlAggregation): Promise<ISettingPagination> {

        const data: ISetting[] | any = await this.settingModel.all();
        return {data, pagination: undefined};


    }

    public async show(id: number): Promise<ISetting> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const dataById: ISetting | any = await this.settingModel.find(id);
        if (!dataById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));
        return dataById;


    }

    public async create(entity: SettingEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const createData: any = await this.settingModel.create(Object.fromEntries(Object.entries(entity)));
        if (!createData) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));

    }

    public async update(id: number, entity: SettingEntity): Promise<void> {
        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const updateById: any = await this.settingModel.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));


    }

    public async delete(id: number): Promise<void> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        await this.settingModel.deleteById(id);

    }
}
