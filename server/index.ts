import { Server } from "http";
import { create, router } from "json-server";

import { port } from "./../config/backend";
import { srcDBFile } from "./../config/paths";

const postLoad = (): void => {
    console.log(`json server: has been started on port ${port}`);
};

export default (): Server => {
    return create().use(router(srcDBFile)).listen(port, postLoad);
};
