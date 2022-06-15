import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class Permission extends Model {
    static table = 'permissions';
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        active: {
            allowNull: false,
            length: 1,
            type: DataTypes.INTEGER,
        }
    }


}