import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class GroupPermission extends Model {
    static table = 'groups_permissions';
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
        groupId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }


}