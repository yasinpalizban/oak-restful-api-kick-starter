import {Entity} from "../../shared/libraries/entity.ts";

export class GroupPermissionEntity extends Entity {
  id: number | undefined ;
  actions: string  | undefined ;
  groupId: number  | undefined ;
  permissionId: number  | undefined ;



  constructor(init?: Partial<GroupPermissionEntity>) {
    super();
    Object.assign(this, init);

  }


}
