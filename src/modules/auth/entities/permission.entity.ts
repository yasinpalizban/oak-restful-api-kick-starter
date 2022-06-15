import {Entity} from "../../shared/libraries/entity.ts";

export class PermissionEntity extends Entity {
  id: number  | undefined ;
  name: string  | undefined ;
  description: string  | undefined ;
  active: boolean | undefined ;
  createdAt: Date | undefined ;
  updatedAt: Date | undefined ;
  deletedAt: Date  | undefined ;

  constructor(init?: Partial<PermissionEntity>) {
    super();
    Object.assign(this, init);
  }


  public createNow(): this {
    this.createdAt = new Date();
    return this;
  }

  public updateNow(): this {
    this.updatedAt = new Date();
    return this;
  }

  public deleteNow(): this {
    this.deletedAt = new Date();
    return this;
  }

}
