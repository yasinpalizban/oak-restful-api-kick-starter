import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import {IndexController} from "../controllers/index.controller.ts";

export class IndexRoute implements Routes {
    public path = '/api/';
    public router = new Router();
    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);

        this.router.post(`${this.path}`, this.indexController.post);


    }


}

