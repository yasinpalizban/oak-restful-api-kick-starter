import {  Application, Router } from "https://deno.land/x/oak/mod.ts";
const books = new Map<string, any>();
books.set("1", {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Author"
});

const router = new Router();
router
    .get("/", context => {
        context.response.body = "Hello world!";
    })
    .get("/book", context => {
        context.response.body = Array.from(books.values());
    })
    .get("/book/:id", context => {
        if (context.params && books.has(context.params.id)) {
            context.response.body = books.get(context.params.id);
        }
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx) => {
    ctx.response.body = "Hello world! yasin";
    console.log(ctx);
});
// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.addEventListener("error", (evt) => {
    // Will log the thrown error to the console.
    console.log(evt.error);
});

await app.listen({ port: 8000 });

