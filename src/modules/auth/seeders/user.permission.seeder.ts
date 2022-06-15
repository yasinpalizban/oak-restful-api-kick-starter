import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import { UserPermission} from "../../../core/database/database.relationship.ts";
import {UserPermissionEntity} from "../entities/user.permission.entity.ts";

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/user.permission.seeder.ts
 *  */

export default class UserPermissionSeeder extends Seeder {
  public model = UserPermission;

  async run(): Promise<void> {
    const dataSeeder = [
      new UserPermissionEntity({
        id: 1,
        permissionId: 2,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 2,
        permissionId: 3,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 3,
        permissionId: 4,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 4,
        permissionId: 5,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
      new UserPermissionEntity({
        id: 5,
        permissionId: 6,
        userId: 1,
        actions: 'get-post-put-delete',
      }),
    ];
    await this.model.create(dataSeeder);
  }
}
