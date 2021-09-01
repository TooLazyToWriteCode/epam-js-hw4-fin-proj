import { join } from "path";
import jsonServer from "json-server";

const port = Number(process.env.PORT || 3031);
const server = jsonServer.create();

server.get("/", (_, response) => response.send("GET / now has status OK"));
server.use(jsonServer.router(join(__dirname, "db.json")));
server.listen(port, () => console.log(`json server: started (port ${port})`));
