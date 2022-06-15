import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import OverViewController from "../controllers/over.view.controller.ts";

export default class OverViewRoute implements Routes {
  public pathNested = '/api/overView';
  public router =  new Router();
  public controller = new OverViewController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
  //  this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
  }
}
