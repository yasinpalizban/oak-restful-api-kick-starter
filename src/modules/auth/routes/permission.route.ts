
import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {PermissionController} from "../controllers/permission.controller.ts";
import {permissionValidation} from "../validations/permission.validation.ts";


export class PermissionRoute implements Routes {

  public path = '/api/permission';

  public router = new Router();
  public controller = new PermissionController();

  constructor() {
    this.initializeRoutes();

  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: permissionValidation}), this.controller.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: permissionValidation}), this.controller.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


  }


}