import { App } from "./app.ts";
import { IndexRoute } from "./modules/home/routes/index.route.ts";
import { TestRoute } from "./modules/home/routes/test.route.ts";
const app = new App([
    new IndexRoute(),
    new TestRoute()
]);
await app.listen();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDN0IsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hFLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUU5RCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNoQixJQUFJLFVBQVUsRUFBRTtJQUNoQixJQUFJLFNBQVMsRUFBRTtDQUNsQixDQUFDLENBQUM7QUFDSCxNQUFNLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyJ9