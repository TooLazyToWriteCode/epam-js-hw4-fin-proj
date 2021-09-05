import { RmOptions, existsSync, rmSync } from "fs";
import { join } from "path";

const cacheDir: string = join(__dirname, "..", "out", "cache");
const rmOptions: RmOptions = { force: true, recursive: true };

if (existsSync(cacheDir)) {
    rmSync(cacheDir, rmOptions);
}
