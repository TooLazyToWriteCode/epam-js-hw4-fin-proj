import { static as staticDir } from "express";
import { create, router } from "json-server";
import { join } from "path";

import database from "./db.json";

const images = join(__dirname, "images");
const port = Number(process.env.PORT) || 3333;

create()
    .use((_, response, next) => {
        response.header("Access-Control-Allow-Headers", "*");
        response.header("Access-Control-Allow-Methods", "*");
        response.header("Access-Control-Allow-Origin", "*");
        next();
    })
    .use("/images", staticDir(images))
    .use((_, response, next) => {
        if (response.req.url.startsWith("/images")) {
            response.sendFile(join(images, "0.png"));
        } else {
            next();
        }
    })
    .use(router({ ...database, caughtPokemons: [] }))
    .listen(port, () => console.log(`started (:${port})`));
