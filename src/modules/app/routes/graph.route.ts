import {Routes} from "../../../core/interfaces/routes.interface.ts";
import {Router} from "https://deno.land/x/oak/mod.ts";
import GraphController from "../controllers/graph.controller.ts";
export default class GraphRoute implements Routes {
  public pathNested = '/api/graph';
  public router = new Router();
  public controller = new GraphController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
//    this.router.get(`${this.pathNested}`, authMiddleware, this.controller.index);
  }
}
