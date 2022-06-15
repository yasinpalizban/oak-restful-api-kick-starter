import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import { Seeder } from "../../shared/libraries/seeder.ts";
import { TestEntity } from "../entities/test.entity.ts";
import { TestModel } from "../models/test.model.ts";
/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../common/seeders/test.seeder.ts
 *  */
export default class TestSeeder extends Seeder {
    model = new TestModel();
    async run() {
        const dataSeeder = new TestEntity({
            name: faker.internet.userName(),
        });
        await this.model.create(dataSeeder);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5zZWVkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LnNlZWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDckUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFbEQ7Ozs7O01BS007QUFFTixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxNQUFNO0lBQ3JDLEtBQUssR0FBYyxJQUFJLFNBQVMsRUFBRSxDQUFDO0lBRTFDLEtBQUssQ0FBQyxHQUFHO1FBQ1AsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDaEMsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1NBQ2hDLENBQUMsQ0FBQztRQUNILE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGIn0=