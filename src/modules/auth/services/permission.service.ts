import {Status, httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";

import {isEmpty} from "../../shared/utils/is.empty.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {Permission} from "../../../core/database/database.relationship.ts";
import {IPermission, IPermissionPagination} from "../interfaces/permission.interface.ts";
import {PermissionEntity} from "../entities/permission.entity.ts";

export default class PermissionService implements ServiceInterface {
    public model = Permission;

    public async index(urlAggregation: UrlAggregation): Promise<IPermissionPagination> {

        const data: IPermission[] | any = await this.model.all();

        return {data, pagination: undefined};


    }

    public async show(id: number): Promise<IPermission> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const dataById: IPermission | any = await this.model.find(id);
        if (!dataById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));
        return dataById;
    }

    public async create(entity: PermissionEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const createData: any = await this.model.create(Object.fromEntries(Object.entries(entity)));
        if (!createData) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));

    }

    public async update(id: number, entity: PermissionEntity): Promise<void> {
        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const updateById: any = await this.model.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));


    }

    public async delete(id: number): Promise<void> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        await this.model.deleteById(id);

    }
}
