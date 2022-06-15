import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class Membership extends Model {
    static table = 'memberships';
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
        groupId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        }
    }


}