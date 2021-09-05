import { static as staticDir } from "express";
import { defaults, create, router } from "json-server";
import { join } from "path";

import database from "./db.json";

const port: number = Number(process.env.PORT) || 3333;

create()
    .use(defaults({ noCors: true }))
    .use("/images", staticDir(join(__dirname, "images")))
    .use(router(database))
    .listen(port, () => console.log(`started (port: ${port})`));
