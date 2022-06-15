import {AppInterface} from "./core/interfaces/app.interface.ts";
import {Routes} from "./core/interfaces/routes.interface.ts";
import {Application, Context, HttpError, Middleware} from "https://deno.land/x/oak/mod.ts";
import timingMiddleware from "./core/middlewares/timing.middleware.ts";
import loggerMiddleware from "./core/middlewares/logger.middleware.ts";
import openingServeEvent from "./core/events/opening.server.event.ts";
import errorMiddleware from "./core/middlewares/error.middleware.ts";
import i18next from 'https://deno.land/x/i18next/index.js'
import Backend from 'https://cdn.jsdelivr.net/gh/i18next/i18next-fs-backend/index.js'
import i18nextMiddleware from 'https://deno.land/x/i18next_http_middleware/index.js'
import {config} from "https://deno.land/x/dotenv/mod.ts";
import {CoreConfig} from "./core/config/core.config.ts";
import {oakCors} from "https://deno.land/x/cors/mod.ts";
import {dataBaseConnection} from "./core/database/database.relationship.ts";
import corsMiddleware from "./modules/common/middlewares/cors.middleware.ts";
import contentNegotiationMiddleware from "./modules/common/middlewares/content.negotiation.middleware.ts";
import urlMiddleware from "./modules/common/middlewares/url.middleware.ts";
import dataInputMiddleware from "./modules/common/middlewares/data.Input.middleware.ts";
import {RequestWithUser} from "./modules/auth/interfaces/reqeust.with.user.interface.ts";

export class App implements AppInterface {
    public application: Application<RequestWithUser>;
    public port: number;
    public baseUrl: string;
    public environment: string;

    constructor(routes: Routes[]) {

        this.port = config().app_port ? parseInt(config().app_port || "") : CoreConfig.app.port;
        this.baseUrl = config().app_baseUrl ? config().app_baseUrl : CoreConfig.app.baseUrl;
        this.environment = config().environment ? config().environment : CoreConfig.environment;

        this.application = new Application<RequestWithUser>();
        this.connectToDatabase();
        this.initMiddleWares();
        this.initializeRoutes(routes);
        this.errorMiddleWares();

    }

    public async listen(): Promise<void> {

        // @ts-ignore
        await this.application.listen({port: this.port});


    }

    private connectToDatabase() {

        dataBaseConnection.sync({drop: false});

    }

    initMiddleWares(): void {

        this.application.use(loggerMiddleware);
        this.application.use(timingMiddleware);
        this.application.addEventListener("listen", openingServeEvent);
        this.application.use(corsMiddleware);
        this.application.use(contentNegotiationMiddleware);
        this.application.use(urlMiddleware);
        this.application.use(dataInputMiddleware);
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
            }, null);


        //  this.application.use(i18nextMiddleware.handle(i18next));
        //  const handle: any = i18nextMiddleware.handle(i18next)
        //   this.application.use({...handle.rq, ...handle.rs}, handle.n);

    }

    private errorMiddleWares(): void {
        this.application.use(errorMiddleware);

    }


    private initializeRoutes(routes: Routes[]) {

        // @ts-ignore
        routes.forEach((hook: any) => {

            this.application.use(hook.router.routes());
            this.application.use(hook.router.allowedMethods());
        });


    }
}