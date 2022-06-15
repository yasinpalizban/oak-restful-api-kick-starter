import { Application } from "https://deno.land/x/oak/mod.ts";
import timingMiddleware from "./core/middlewares/timing.middleware.ts";
import loggerMiddleware from "./core/middlewares/logger.middleware.ts";
import openingServeEvent from "./core/events/opening.server.event.ts";
import errorMiddleware from "./core/middlewares/error.middleware.ts";
import i18next from 'https://deno.land/x/i18next/index.js';
import Backend from 'https://cdn.jsdelivr.net/gh/i18next/i18next-fs-backend/index.js';
import i18nextMiddleware from 'https://deno.land/x/i18next_http_middleware/index.js';
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { CoreConfig } from "./core/config/core.config.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { db } from "./core/database/database.ts";
export class App {
    application;
    port;
    baseUrl;
    environment;
    constructor(routes) {
        this.port = config().app_port ? parseInt(config().app_port || "") : CoreConfig.app.port;
        this.baseUrl = config().app_baseUrl ? config().app_baseUrl : CoreConfig.app.baseUrl;
        this.environment = config().environment ? config().environment : CoreConfig.environment;
        this.application = new Application();
        this.connectToDatabase();
        this.initializeRoutes(routes);
        this.initializeI18n();
        this.initMiddleWares();
    }
    async listen() {
        // @ts-ignore
        await this.application.listen({ port: this.port });
    }
    connectToDatabase() {
        // If you need debug logs, set `debug` to `true`
        db.sync({ drop: false });
    }
    initMiddleWares() {
        this.application.use(oakCors());
        this.application.use(loggerMiddleware);
        this.application.use(timingMiddleware);
        this.application.addEventListener("listen", openingServeEvent);
        // this.application.use((ctx) => {
        //   //  ctx.response.body = "Hello world! yasin";
        //     console.log(ctx);
        // });
        this.application.use(errorMiddleware);
        this.application.use((ctx) => {
            // Will throw a 500 on every request.
            ctx.throw(500);
        });
    }
    initializeI18n() {
        // @ts-ignore
        i18next
            .use(Backend)
            .use(i18nextMiddleware.LanguageDetector)
            .init({
            // debug: true,
            backend: {
                loadPath: 'locales/{{lng}}/{{ns}}.json',
                addPath: 'locales/{{lng}}/{{ns}}.missing.json'
            },
            fallbackLng: 'en',
            preload: ['en', 'de']
        });
        // //this.application.use(i18nextMiddleware.handle(i18next));
        // const handle = i18nextMiddleware.handle(i18next)
        // this.application.use((ctx: Context ,next) => {
        //
        //     (c:any )=>{
        //         handle(ctx.request, ctx.response, () => {})
        //        return  next();
        //     }
        //     // return next(ctx)
        // });
    }
    initializeRoutes(routes) {
        // @ts-ignore
        routes.forEach((hook) => {
            this.application.use(hook.router.routes());
            this.application.use(hook.router.allowedMethods());
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBQyxXQUFXLEVBQWlDLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0YsT0FBTyxnQkFBZ0IsTUFBTSx5Q0FBeUMsQ0FBQztBQUN2RSxPQUFPLGdCQUFnQixNQUFNLHlDQUF5QyxDQUFDO0FBQ3ZFLE9BQU8saUJBQWlCLE1BQU0sdUNBQXVDLENBQUM7QUFDdEUsT0FBTyxlQUFlLE1BQU0sd0NBQXdDLENBQUM7QUFDckUsT0FBTyxPQUFPLE1BQU0sc0NBQXNDLENBQUE7QUFDMUQsT0FBTyxPQUFPLE1BQU0saUVBQWlFLENBQUE7QUFDckYsT0FBTyxpQkFBaUIsTUFBTSxzREFBc0QsQ0FBQTtBQUNwRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDekQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDL0MsTUFBTSxPQUFPLEdBQUc7SUFDTCxXQUFXLENBQWM7SUFDekIsSUFBSSxDQUFTO0lBQ2IsT0FBTyxDQUFTO0lBQ2hCLFdBQVcsQ0FBUztJQUUzQixZQUFZLE1BQWdCO1FBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN4RixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMs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