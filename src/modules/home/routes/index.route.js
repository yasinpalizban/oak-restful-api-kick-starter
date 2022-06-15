import { Router } from "https://deno.land/x/oak/mod.ts";
import { IndexController } from "../controllers/index.controller.ts";
export class IndexRoute {
    path = '/';
    router = new Router();
    indexController = new IndexController();
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgucm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRW5FLE1BQU0sT0FBTyxVQUFVO0lBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNYLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBRS9DO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLGdCQUFnQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWhFLENBQUM7Q0FLSiJ9