import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import { GroupPermission} from "../../../core/database/database.relationship.ts";

import {GroupPermissionEntity} from "../entities/group.permission.entity.ts";

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/group.permission.seeder.ts
 *  */

export default class GroupPermissionSeeder extends Seeder {
  public model = GroupPermission;
  async run(): Promise<void> {
    const dataSeeder = [
      new GroupPermissionEntity({
        id: 1,
        actions: 'get-',
        groupId: 1,
        permissionId: 1,
      }),
      new GroupPermissionEntity({
        id: 2,
        actions: 'get-post-put-delete',
        groupId: 1,
        permissionId: 2,
      }),
      new GroupPermissionEntity({
        id: 3,
        actions: 'get-',
        groupId: 1,
        permissionId: 3,
      }),
      new GroupPermissionEntity({
        id: 4,
        actions: 'get-',
        groupId: 1,
        permissionId: 4,
      }),
      new GroupPermissionEntity({
        id: 5,
        actions: 'get-',
        groupId: 1,
        permissionId: 5,
      }),
      new GroupPermissionEntity({
        id: 6,
        actions: 'get-',
        groupId: 1,
        permissionId: 6,
      }),
    ];
    await this.model.create(dataSeeder);
  }
}
