import { TaskFunction } from "gulp";

import start from "../server";

export const serveDB: TaskFunction = (done) => {
    start();
    done();
};
