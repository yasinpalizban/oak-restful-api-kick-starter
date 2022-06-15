import { faker } from "https://deno.land/x/deno_faker@v1.0.3/mod.ts";
import {Seeder} from "../../shared/libraries/seeder.ts";
import {User,Membership, Group} from "../../../core/database/database.relationship.ts";
import {UserEntity} from "../entities/user.entity.ts";
import {RoleType} from "../../auth/enums/role.type.enum.ts";
import {IGroup} from "../../auth/interfaces/group.interface.ts";
import {IUser} from "../../auth/interfaces/user.interface.ts";
/*
 *  in order to seeder work perfectly out he box
 * you need import exact path  avoid using aliases path  for import file
 *
 *  cmd : npm run seeder --seed=../../common/seeders/user.seeder.ts
 *  */

export default class UserSeeder extends Seeder {
  public model = User;
  public userGroupModel = Membership;
  public groupModel = Group;

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  //default password is 1234
  async run(): Promise<void> {
    const randomRole: string = Object.values(RoleType)[this.getRandomInt(Object.values(RoleType).length)];

    const dataSeeder = new UserEntity({
      username: faker.internet.userName(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      password: '$2b$10$urCbSxfTDjo8GTTfD1aDMeqd0wv3oQQz.XE0MJ3oQ7G4MYq..FaIy',
      lastName: faker.name.findName(),
      firstName: faker.name.lastName(),
      gender: faker.name.gender(),
      image: 'public/upload/profile/default-avatar.jpg',
      city: faker.address.city(),
      country: faker.address.country(),
      address: faker.address.streetAddress(),

      active: faker.datatype.boolean(),
      status: faker.datatype.boolean(),
      createdAt: faker.datatype.datetime(),
    });

    const newUser: IUser| any = await this.model.create(dataSeeder);
    const group: IGroup| any = await this.groupModel.where({ name: RoleType.Member } ).get();
    await this.userGroupModel.create({ userId: newUser.id, groupId: group.id });
  }
}
