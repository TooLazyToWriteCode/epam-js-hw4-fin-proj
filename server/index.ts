import { static as staticDir } from "express";
import { create, router } from "json-server";
import { join } from "path";

import database from "./db.json";

const port = Number(process.env.PORT) || 3333;

create()
    .use((_, response, next) => {
        response.header("Access-Control-Allow-Headers", "*");
        response.header("Access-Control-Allow-Methods", "*");
        response.header("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/images", staticDir(join(__dirname, "images")))
    .use(router({ ...database, caughtPokemons: [] }))
    .listen(port, () => console.log(`started (:${port})`));
