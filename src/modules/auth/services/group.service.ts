import {Status,httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {Group} from "../../../core/database/database.relationship.ts";
import {IGroup, IGroupPagination} from "../interfaces/group.interface.ts";
import {GroupEntity} from "../entities/group.entity.ts";

export default class GroupService implements ServiceInterface {
    public model = Group;

    public async index(urlAggregation: UrlAggregation): Promise<IGroupPagination> {

        const data: IGroup[] | any = await this.model.all();
        return {data, pagination: undefined};
    }

    public async show(id: number): Promise<IGroup> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));
        const dataById: IGroup | any = await this.model.find(id);
        if (!dataById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));
        return dataById;

    }

    public async create(entity: GroupEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const createData: any = await this.model.create(Object.fromEntries(Object.entries(entity)));
        if (!createData) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));

    }

    public async update(id: number, entity: GroupEntity): Promise<void> {
        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        const updateById: any = await this.model.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateById) throw new httpErrors.Conflict( i18next.t('api.commons.exist'));


    }

    public async delete(id: number): Promise<void> {
        if (isEmpty(id)) throw new httpErrors.BadRequest( i18next.t('api.commons.reject'));

        await this.model.deleteById(id);

    }
}
