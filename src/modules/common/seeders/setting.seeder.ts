import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import {Setting} from "../../../core/database/database.relationship.ts";
import {SettingEntity} from "../entities/setting.entity.ts";



/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd :  deno run --allow-read --allow-net --allow-write --allow-env  --unstable
 src\core\utils\call.seeder.ts -seed=../../modules/home/seeders/test.seeder.ts

 *  */

export default class SettingSeeder extends Seeder {

  public model = Setting;

  async run(): Promise<void> {
    const dataSeeder = new SettingEntity({
      key: faker.internet.userName(),
      value: faker.internet.accountName(),
      description: faker.internet.address(),
      createdAt: faker.date.recent(),
    });
    await this.model.create(Object.fromEntries(Object.entries(dataSeeder)));
  }
}
