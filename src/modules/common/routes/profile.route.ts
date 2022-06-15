import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {ProfileController} from "../controllers/profile.controller.ts";
import {authMiddleware} from "../../auth/middlewares/auth.middleware.ts";
import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {profileValidation} from "../validations/profile.validation.ts";

export class ProfileRoute implements Routes {
    public path = '/api/profile';
    public router = new Router();
    public profileController = new ProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.profileController.index);

        this.router.post(`${this.path}`, authMiddleware, validatorMiddleware({bodyRules: profileValidation}), this.profileController.post);


    }


}

