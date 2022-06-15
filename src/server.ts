import {App} from "./app.ts";
import {IndexRoute} from "./modules/home/routes/index.route.ts";
import AuthRoute from "./modules/auth/routes/auth.route.ts";
import {SettingRoute} from "./modules/common/routes/setting.route.ts";
import {ProfileRoute} from "./modules/common/routes/profile.route.ts";
import {UserRoute} from "./modules/common/routes/user.route.ts";
import {GroupRoute} from "./modules/auth/routes/group.route.ts";
import {PermissionRoute} from "./modules/auth/routes/permission.route.ts";
import {UserPermissionRoute} from "./modules/auth/routes/user.permission.route.ts";
import {GroupPermissionRoute} from "./modules/auth/routes/group.permission.route.ts";

const app = new App([
    new AuthRoute(),
    new GroupRoute(),
    new PermissionRoute(),
    new UserPermissionRoute(),
    new GroupPermissionRoute(),
    new ProfileRoute(),
    new UserRoute(),
    new SettingRoute(),
    new IndexRoute(),

]);
await app.listen();