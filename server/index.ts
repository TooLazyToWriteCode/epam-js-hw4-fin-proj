import { join } from "path";
import express from "express";
import jsonServer from "json-server";

const port = process.env.PORT === undefined ? 3333 : Number(process.env.PORT);
const server = jsonServer.create();

server.get("/", (_, response) => response.send("GET / now has status 200"));
server.use("/images", express.static(join(__dirname, "images")));
server.use(jsonServer.router(join(__dirname, "db.json")));
server.listen(port, () => console.log(`json server: started (port ${port})`));
