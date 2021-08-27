import gulp from "gulp";

import start from "./../server";

gulp.task("serve:db", (done) => {
    start().addListener("close", done);
});
