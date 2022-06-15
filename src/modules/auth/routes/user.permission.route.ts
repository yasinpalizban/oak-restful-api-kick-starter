import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {UserPermissionController} from "../controllers/user.permission.controller.ts";
import {userPermissionValidation} from "../validations/user.permission.validation.ts";
import {authMiddleware} from "../middlewares/auth.middleware.ts";

export class UserPermissionRoute implements Routes {
    public pathNested = '/api/permission/:id/userPermission';
    public path = '/api/userPermission';

    public router = new Router();
    public controller = new UserPermissionController();

    constructor() {
        this.initializeRoutes();

    }

    private initializeRoutes() {
        this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
        this.router.get(`${this.path}`, authMiddleware, this.controller.index);
        this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
        this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: userPermissionValidation}), this.controller.create);
        this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: userPermissionValidation}), this.controller.update);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


    }


}