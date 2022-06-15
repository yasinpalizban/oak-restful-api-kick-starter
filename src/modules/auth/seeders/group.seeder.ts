import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import { Group} from "../../../core/database/database.relationship.ts";
import {GroupEntity} from "../entities/group.entity.ts";


/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/group.seeder.ts
 *  */

export default class GroupSeeder extends Seeder {
  public model =  Group;

  async run(): Promise<void> {
    const dataSeeder = [
      new GroupEntity({ id: 1, name: 'admin', description: 'admins' }),
      new GroupEntity({ id: 2, name: 'coworker', description: 'co workers' }),
      new GroupEntity({ id: 3, name: 'blogger', description: 'bloggers' }),
      new GroupEntity({ id: 4, name: 'member', description: 'members' }),
    ];

    await this.model.create(dataSeeder);
  }
}
