import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {GroupPermissionController} from "../controllers/group.permission.controller.ts";
import {groupPermissionValidation} from "../validations/group.permission.validation.ts";





export class GroupPermissionRoute implements Routes {
  public pathNested = '/api/permission/:id/groupPermission';
  public path = '/api/groupPermission';

  public router = new Router();
  public controller = new GroupPermissionController();

  constructor() {
    this.initializeRoutes();

  }

  private initializeRoutes() {
    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: groupPermissionValidation}), this.controller.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: groupPermissionValidation}), this.controller.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


  }


}