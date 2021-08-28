import jsonServer from "json-server";

const port = Number(process.env.PORT || 3031);
const router = jsonServer.router(`${__dirname}/db.json`);

const onListen = (): void => {
    console.log(`json server: started (port ${port})`);
};

jsonServer.create().use(router).listen(port, onListen);
