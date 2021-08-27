import { task, src } from "gulp";
import typedoc from "gulp-typedoc";

import { outDocDir, srcFiles } from "./../config/paths";
import { name } from "./../config/meta";

task("doc", () => {
    return src(srcFiles).pipe(typedoc({ name, out: outDocDir }));
});
