import {  Context,  Response } from "https://deno.land/x/oak/mod.ts";

export declare interface ApiFunctionInterface {

  index(context: Context, next: () => Promise<void>): Promise<void|Response>;

  //
  show(context: Context, next: () => Promise<void>): Promise<void|Response>;

  //
  create(context: Context, next: () => Promise<void>): Promise<void|Response>;

  //
  update(context: Context, next: () => Promise<void>): Promise<void|Response>;

  delete(context: Context, next: () => Promise<void>): Promise<void|Response>;

  all(context: Context, next: () => Promise<void>): Promise<void|Response>;

}
