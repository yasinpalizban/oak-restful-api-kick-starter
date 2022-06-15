import {dataBaseConnection} from "./database.connection.ts"
import {Relationships} from 'https://deno.land/x/denodb/mod.ts';

import {Setting} from "../../modules/common/models/setting.model.ts";
import {Group} from "../../modules/auth/models/group.model.ts";
import {IpActivity} from "../../modules/auth/models/ip.activity.model.ts";
import {GroupPermission} from "../../modules/auth/models/group.permission.model.ts";
import {Permission} from "../../modules/auth/models/permission.model.ts";
import {UserPermission} from "../../modules/auth/models/user.permission.model.ts";
import {User} from "../../modules/auth/models/user.model.ts";
import {Membership} from "../../modules/auth/models/user.group.model.ts";

Relationships.manyToMany(Membership, User);
Relationships.manyToMany(Membership, Group);
Relationships.manyToMany(UserPermission, Permission);
Relationships.manyToMany(GroupPermission, Permission);
Relationships.manyToMany(UserPermission, User);
Relationships.manyToMany(GroupPermission, Group);


dataBaseConnection.link([
    User,
    Setting,
    Group,
    IpActivity,
    Permission,
    GroupPermission,
    UserPermission,
    Membership,
]);
export {
    dataBaseConnection,
    User,
    Setting,
    Group,
    Membership,
    IpActivity,
    Permission,
    GroupPermission,
    UserPermission
};


