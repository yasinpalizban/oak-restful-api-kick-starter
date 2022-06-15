import {  Router } from "https://deno.land/x/oak/mod.ts";

export interface Routes {
  path?: string;
  router: Router;
}
