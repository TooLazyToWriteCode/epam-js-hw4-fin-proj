import express from "express";
import jsonServer from "json-server";
import { join } from "path";

const port = process.env.PORT === undefined ? 3333 : Number(process.env.PORT);
const server = jsonServer.create();

server.use("/images", express.static(join(__dirname, "images")));
server.use(jsonServer.router(join(__dirname, "db.json")));
server.listen(port, () => console.log(`json server: started (port ${port})`));
