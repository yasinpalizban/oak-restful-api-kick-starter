import {config} from "https://deno.land/x/dotenv/mod.ts";
import {CoreConfig} from "../config/core.config.ts";
import {MySQLConnector, Database} from 'https://deno.land/x/denodb/mod.ts';
const connector = new MySQLConnector({
    host: config().db_hostname ? config().db_hostname : CoreConfig.database.hostname,
    username: config().db_username ? config().db_username : CoreConfig.database.username,
    password: config().db_password ? config().db_password : CoreConfig.database.password,
    database: config().db_name ? config().db_name : CoreConfig.database.name,
});
const environment: string = config().app_environment ? config().app_environment : CoreConfig.environment
export const dataBaseConnection = new Database(
    {
        connector,
        //debug: environment == "development", // <-
        debug: false, // <-
    }
);



