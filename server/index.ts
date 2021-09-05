import { static as staticDir } from "express";
import { create, router } from "json-server";
import { join } from "path";

const port: number = Number(process.env.PORT) || 3333;

create()
    .use("/images", staticDir(join(__dirname, "images")))
    .use(router(join(__dirname, "db.json")))
    .listen(port, () => console.log(`json server: started (port ${port})`));
