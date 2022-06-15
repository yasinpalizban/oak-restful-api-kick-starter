import {Status,httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import { GroupPermission} from "../../../core/database/database.relationship.ts";
import {IGroupPermission, IGroupPermissionPagination} from "../interfaces/group.permission.interface.ts";
import {GroupPermissionEntity} from "../entities/group.permission.entity.ts";

export default class GroupPermissionService implements ServiceInterface {
    public model = GroupPermission;

    public async index(urlAggregation: UrlAggregation): Promise<IGroupPermissionPagination> {

        const data: IGroupPermission[] | any = await this.model.all();

        return {data, pagination: undefined};


    }

    public async show(id: number): Promise<IGroupPermission[]> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const dataById: IGroupPermission | any = await this.model.find(id);
        if (!dataById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));
        return [dataById];


    }

    public async create(entity: GroupPermissionEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const createData: any = await this.model.create(Object.fromEntries(Object.entries(entity)));
        if (!createData) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));

    }

    public async update(id: number, entity: GroupPermissionEntity): Promise<void> {
        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const updateById: any = await this.model.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));


    }

    public async delete(id: number): Promise<void> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        await this.model.deleteById(id);

    }
}
