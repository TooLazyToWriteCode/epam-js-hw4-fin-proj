import { task } from "gulp";

import start from "./../server";

task("serve:db", (done) => {
    start().addListener("close", done);
});
