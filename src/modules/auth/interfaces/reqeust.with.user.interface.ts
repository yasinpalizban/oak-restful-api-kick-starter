import {ILogIn} from "./Log.in.interface.ts";
import { Context  } from "https://deno.land/x/oak/mod.ts";
export interface RequestWithUser extends  Context {
  user?: ILogIn;

}



