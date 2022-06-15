import {IUser} from "./user.interface.ts";
import {TokenData} from "./jwt.token.interface.ts";
import {IPermission} from "./permission.interface.ts";
import {IUserPermission} from "./user.permission.interface.ts";
import {IGroupPermission} from "./group.permission.interface.ts";
import {IGroup} from "./group.interface.ts";

export interface ILogIn {
  cookie?: string;
  findUser: IUser;
  jwt?: TokenData;
  permissions?: IPermission[];
  permissionUser?: IUserPermission[];
  permissionGroup?: IGroupPermission[];
  role?: IGroup;
}


