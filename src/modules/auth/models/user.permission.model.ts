import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class UserPermission extends Model {
    static table = 'users_permissions';
    static timestamps = true;
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
        actions: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255
        },
        permissionId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }


}