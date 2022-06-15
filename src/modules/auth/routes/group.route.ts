import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";
import {groupValidation} from "../validations/group.validation.ts";
import {GroupController} from "../controllers/group.controller.ts";



export class GroupRoute implements Routes {

  public path = '/api/group';

  public router = new Router();
  public controller = new GroupController();

  constructor() {
    this.initializeRoutes();

  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.controller.index);
    this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
    this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: groupValidation}), this.controller.create);
    this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: groupValidation}), this.controller.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


  }


}