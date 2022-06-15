/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *  */
import {SeederInterface} from "../interfaces/seeder.interface.ts";
import {dataBaseConnection} from "../../../core/database/database.relationship.ts";

export class Seeder implements SeederInterface {
    constructor() {
        dataBaseConnection.sync({drop: false});
    }

    async run(): Promise<void> {
        //
    }
}
