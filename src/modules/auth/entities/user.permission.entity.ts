import {Entity} from "../../shared/libraries/entity.ts";

export class UserPermissionEntity extends Entity {
  id: number | undefined ;
  actions: string  | undefined ;
  userId: number | undefined ;
  permissionId: number  | undefined ;


  constructor(init?: Partial<UserPermissionEntity>) {
    super();
    Object.assign(this, init);

  }


}
