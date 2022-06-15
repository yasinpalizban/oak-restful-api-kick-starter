import {Entity} from "../../shared/libraries/entity.ts";

export class SettingEntity extends Entity {
  id: number  | undefined ;
  key: string  | undefined ;
  value: string | undefined ;
  description: string  | undefined ;
  status: boolean | undefined ;
  createdAt: Date  | undefined ;
  updatedAt: Date  | undefined ;
  deletedAt: Date | undefined ;
  constructor(init?: Partial<SettingEntity>) {
    super();
    Object.assign(this, init);
  }




  public enableStatus(): this {
    this.status = true;
    return this;
  }

  public disableStatus(): this {
    this.status = false;
    return this;
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
