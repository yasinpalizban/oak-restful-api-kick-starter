import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import { Group, User, Membership} from "../../../core/database/database.relationship.ts";
import {AuthEntity} from "../entities/auth.entity.ts";
import {IUser} from "../interfaces/user.interface.ts";
import {IGroup} from "../interfaces/group.interface.ts";
import {RoleType} from "../enums/role.type.enum.ts";

/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../auth/seeders/auth.seeder.ts
 *  */

export default class AuthSeeder extends Seeder {
  public model = User;
  public groupModel = Group;
  public userGroupModel = Membership;

  //default password is 1234
  async run(): Promise<void> {
    const dataSeeder = new AuthEntity({
      username: 'admin',
      phone: '0918000',
      email: 'admin@admin.com',
      password: '$2b$10$urCbSxfTDjo8GTTfD1aDMeqd0wv3oQQz.XE0MJ3oQ7G4MYq..FaIy',
      active: true,
      createdAt: faker.datatype.datetime(),
      image: 'public/upload/profile/default-avatar.jpg',
    });
    const authUser: IUser[]| any = await this.model.create(dataSeeder);
    const group: IGroup| any = await this.groupModel.where('name', RoleType.Admin);
    await this.userGroupModel.create({ userId: authUser.id, groupId: group.id });
  }
}
