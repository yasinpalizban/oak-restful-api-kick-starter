import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';


export class User extends Model {
    static table = 'users';

    static fields = {
        id: {primaryKey: true, autoIncrement: true},

        username: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            length: 255,
        },
        country: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        gender: {
            allowNull: true,
            type: DataTypes.INTEGER,
            length: 1,
        },
        firstName: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        image: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        active: {
            allowNull: false,
            type: DataTypes.INTEGER,
            length: 1,
        },
        activeToken: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        activeExpires: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        status: {
            allowNull: true,
            type: DataTypes.INTEGER,
            length: 1,
        },

        resetAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },

        resetExpires: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        resetToken: {
            allowNull: true,
            type: DataTypes.DATE,
        },
        statusMessage: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING,
            length: 255,
        },
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