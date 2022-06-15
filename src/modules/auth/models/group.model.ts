import {DataTypes, Model} from 'https://deno.land/x/denodb/mod.ts';

export class Group extends Model {
    static table = 'groups';
    static fields = {
        id: {primaryKey: true, autoIncrement: true},
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 255,
        },


    }

    static getUserForGroup(id: number): any {
        // await this.where('userGroup.userId', id)
        //     .leftJoin(Airport, Airport.field('id'), Flight.field('airportId'))
        //     .get();
        //return this.where('id', '');
        return {id: 1, name: 'admin'};
    }

    // async getUserForGroup(id: number): Promise<any> {
    //     return await this.findOne({
    //         include: [
    //             {
    //                 model: UserGroupModel,
    //                 where: {userId: id},
    //                 attributes: [],
    //             },
    //         ],
    //     });
    // }


}
