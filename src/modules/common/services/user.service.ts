import {Status, httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";
import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {User} from "../../../core/database/database.relationship.ts";
import {IUser, IUserPagination} from "../../auth/interfaces/user.interface.ts";
import {UserEntity} from "../entities/user.entity.ts";

export default class UserService implements ServiceInterface {
    public userModel = User;

    public async index(urlAggregation: UrlAggregation): Promise<IUserPagination> {

        const data: IUser[] | any = await this.userModel.all();

        return {data, pagination: undefined};


        // const defaultPipeline: AggregatePipeLine = {
        //     attributes: [
        //         [Sequelize.literal('`UserModel`.`id`'), 'id'],
        //         [Sequelize.literal('`UserModel`.`username`'), 'username'],
        //         [Sequelize.literal('`UserModel`.`email`'), 'email'],
        //         [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        //         [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        //         [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        //         [Sequelize.literal('`UserModel`.`image`'), 'image'],
        //         [Sequelize.literal('`UserModel`.`gender`'), 'gender'],
        //         [Sequelize.literal('`UserModel`.`birthday`'), 'birthday'],
        //         [Sequelize.literal('`UserModel`.`country`'), 'country'],
        //         [Sequelize.literal('`UserModel`.`address`'), 'address'],
        //         [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        //         [Sequelize.literal('`UserModel`.`status`'), 'status'],
        //         [Sequelize.literal('`UserModel`.`status_message`'), 'statusMessage'],
        //         [Sequelize.literal('`UserModel`.`active`'), 'active'],
        //         [Sequelize.literal('`UserModel`.`created_at`'), 'createdAt'],
        //         [Sequelize.literal('`UserModel`.`updated_at`'), 'updatedAt'],
        //         [Sequelize.literal('`UserModel`.`deleted_at`'), 'deletedAt'],
        //         [Sequelize.literal('`GroupModel`.`name`'), 'group'],
        //     ],
        //     include: [
        //         {
        //             model: DB.users,
        //             attributes: [],
        //         },
        //         {
        //             model: DB.group,
        //             attributes: [],
        //         },
        //     ],
        // };
        //
        // const pipeLine: AggregatePipeLine = urlAggregation.decodeQueryParam().getPipeLine(defaultPipeline);
        // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // // @ts-ignore
        // const {docs, pages, total} = await this.userGroupModel.paginate(pipeLine);
        // const data: IUser[] = docs;
        // const paginate: IPagination = paginationFields(pipeLine.paginate, pages, total);
        // return {data: data, pagination: paginate};

    }

    public async show(id: number): Promise<IUser> {
        if (isEmpty(id)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        const dataById: IUser | any = await this.userModel.find(id);
        if (!dataById) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));
        return dataById;

        // const dataById: IUser | any = await this.userGroupModel.findOne({
        //     where: {userId: id},
        //     attributes: [
        //         [Sequelize.literal('`UserModel`.`id`'), 'id'],
        //         [Sequelize.literal('`UserModel`.`username`'), 'username'],
        //         [Sequelize.literal('`UserModel`.`email`'), 'email'],
        //         [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        //         [Sequelize.literal('`UserModel`.`last_name`'), 'lastName'],
        //         [Sequelize.literal('`UserModel`.`first_name`'), 'firstName'],
        //         [Sequelize.literal('`UserModel`.`image`'), 'image'],
        //         [Sequelize.literal('`UserModel`.`gender`'), 'gender'],
        //         [Sequelize.literal('`UserModel`.`birthday`'), 'birthday'],
        //         [Sequelize.literal('`UserModel`.`country`'), 'country'],
        //         [Sequelize.literal('`UserModel`.`address`'), 'address'],
        //         [Sequelize.literal('`UserModel`.`phone`'), 'phone'],
        //         [Sequelize.literal('`UserModel`.`status`'), 'status'],
        //         [Sequelize.literal('`UserModel`.`status_message`'), 'statusMessage'],
        //         [Sequelize.literal('`UserModel`.`active`'), 'active'],
        //         [Sequelize.literal('`UserModel`.`created_at`'), 'createdAt'],
        //         [Sequelize.literal('`UserModel`.`updated_at`'), 'updatedAt'],
        //         [Sequelize.literal('`UserModel`.`deleted_at`'), 'deletedAt'],
        //         [Sequelize.literal('`GroupModel`.`name`'), 'group'],
        //     ],
        //     include: [
        //         {
        //             model: DB.users,
        //             attributes: [],
        //         },
        //         {
        //             model: DB.group,
        //             attributes: [],
        //         },
        //     ],
        // });


    }

    public async create(entity: UserEntity): Promise<void> {
        if (isEmpty(entity)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        const createData: any = await this.userModel.create(Object.fromEntries(Object.entries(entity)));
        if (!createData) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));

    }

    public async update(id: number, entity: UserEntity): Promise<void> {
        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        const updateById: any = await this.userModel.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateById) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));


    }

    public async delete(id: number): Promise<void> {
        if (isEmpty(id)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        await this.userModel.deleteById(id);

    }
}
