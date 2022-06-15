import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {UserController} from "../controllers/user.controller.ts";
import {userPostValidation, userPutValidation} from "../validations/user.validation.ts";
import {authMiddleware} from "../../auth/middlewares/auth.middleware.ts";

export class UserRoute implements Routes {
    public path = '/api/user';
    public router = new Router();
    public controller = new UserController();

    constructor() {
        this.initializeRoutes();

    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.controller.index);
        this.router.get(`${this.path}/:id`, authMiddleware, this.controller.show);
        this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: userPostValidation}), this.controller.create);
        this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: userPutValidation}), this.controller.update);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.controller.delete);


    }


}

