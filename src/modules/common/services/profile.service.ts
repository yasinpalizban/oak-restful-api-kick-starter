import {Status, httpErrors} from "https://deno.land/x/oak/mod.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import {ServiceInterface} from "../../shared/interfaces/service.interface.ts";
import {isEmpty} from "../../shared/utils/is.empty.ts";

import {UrlAggregation} from "../../shared/libraries/urlAggregation.ts";
import {User} from "../../../core/database/database.relationship.ts";
import {IUser} from "../../auth/interfaces/user.interface.ts";
import {UserEntity} from "../entities/user.entity.ts";
import {authConfig} from "../../auth/configs/auth.config.ts";
import {deleteFile} from "../../shared/utils/delete.file.ts";
import {sharedConfig} from "../../shared/configs/shared.config.ts";

export default class ProfileService implements ServiceInterface {
    public userModel = User;


    public async show(id: number): Promise<IUser> {

        if (isEmpty(id)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        console.log(await this.userModel.find(id));
        const dataById: IUser | any = await this.userModel.find(id);
        if (!dataById) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));
        return dataById;

    }

    public async update(id: number, entity: UserEntity): Promise<void> {

        if (isEmpty(id) || isEmpty(entity)) throw new httpErrors.BadRequest(i18next.t('api.commons.reject'));

        const findUser: IUser | any = await this.userModel.where('id', id);
        if (!findUser) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));

        const updateUserById = await await this.userModel.where('id', id).update(Object.fromEntries(Object.entries(entity)));
        if (!updateUserById) throw new httpErrors.Conflict(i18next.t('api.commons.exist'));

        if (findUser.image != authConfig.defaultUserProfile && entity.image !== undefined) await deleteFile(sharedConfig.appRoot + findUser.image);


    }

}
