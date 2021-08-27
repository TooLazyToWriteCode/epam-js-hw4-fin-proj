import { task, src } from "gulp";
import typedoc from "gulp-typedoc";

import { name } from "./../config/meta";
import { outDocDir, srcFiles } from "./../config/paths";

task("doc", () => {
    return src(srcFiles).pipe(typedoc({ name, out: outDocDir }));
});
