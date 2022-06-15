import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class IpActivity extends Model {
    static table = 'ip_activity';
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        ipAddress: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255
        },
        userAgent: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255
        },
        login: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        success: {
            allowNull: false,
            type: DataTypes.INTEGER,
            length: 1
        }

    }

}