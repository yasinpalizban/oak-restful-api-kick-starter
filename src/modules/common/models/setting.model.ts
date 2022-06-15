import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class Setting extends Model {
    static table = 'setting';
    static timestamps = true;
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
       key: {
            type: DataTypes.STRING,
           length: 255,
            allowNull: false,
        },
        value: {type: DataTypes.STRING, length: 255},
        description: {type: DataTypes.STRING, length: 255},
        createdAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        deletedAt: {
            allowNull: true,
            type: DataTypes.DATE,
        }
    };


}