
import {Context, Response, Status} from "https://deno.land/x/oak/mod.ts";
import {RequestWithUser} from "./reqeust.with.user.interface.ts";

export declare interface AuthControllerInterface {
  signUp(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  signIn(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  signOut(req: RequestWithUser, next: () => Promise<unknown>): Promise<void | Response>;

  forgot(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  activationViaEmail(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  sendActivateCodeViaEmail(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  activationViaSms(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  sendActivateCodeViaSms(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  resetPasswordViaEmail(context: Context, next: () => Promise<unknown>): Promise<void | Response>;

  resetPasswordViaSms(context: Context, next: () => Promise<unknown>): Promise<void | Response>;
}
