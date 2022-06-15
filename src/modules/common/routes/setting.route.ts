import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";

import {validatorMiddleware} from "../../../core/middlewares/validator.middleware.ts";
import {SettingController} from "../controllers/setting.controller.ts";
import {settingPostValidation, settingPutValidation} from "../validations/setting.validation.ts";
import {authMiddleware} from "../../auth/middlewares/auth.middleware.ts";

export class SettingRoute implements Routes {
    public path = '/api/setting';
    public router = new Router();
    public settingController = new SettingController();

    constructor() {
        this.initializeRoutes();

    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.settingController.index);
        this.router.get(`${this.path}/:id`,  authMiddleware,this.settingController.show);
        this.router.post(`${this.path}`,  authMiddleware,validatorMiddleware({bodyRules: settingPostValidation}), this.settingController.create);
        this.router.put(`${this.path}/:id`, authMiddleware, validatorMiddleware({bodyRules: settingPutValidation}), this.settingController.update);
        this.router.delete(`${this.path}/:id`,  authMiddleware,this.settingController.delete);


    }


}

