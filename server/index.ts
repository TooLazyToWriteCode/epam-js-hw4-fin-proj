import { create, router } from "json-server";

import { port } from "../config/backend";
import { srcDBFile } from "../config/paths";

const postLoad = (): void => {
    console.log(`json server: started on port ${port}`);
};

export default (): void => {
    create().use(router(srcDBFile)).listen(port, postLoad);
};
