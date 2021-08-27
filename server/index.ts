import { create, router } from "json-server";

import { port } from "../config/backend";
import { srcDbFile } from "../config/paths";

const postLoad = () => {
    console.log(`json server: started on port ${port}`);
};

create().use(router(srcDbFile)).listen(port, postLoad);
