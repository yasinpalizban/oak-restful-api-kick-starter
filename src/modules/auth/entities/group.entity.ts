import {Entity} from "../../shared/libraries/entity.ts";

export class GroupEntity extends Entity {
  id: number | undefined ;
  name: string  | undefined ;
  description: string  | undefined ;


  constructor(init?: Partial<GroupEntity>) {
    super();
    Object.assign(this, init);

  }


}
