import { existsSync, rmSync } from "fs";
import { join } from "path";

const cacheDir = join(__dirname, "..", "out", "cache");

if (existsSync(cacheDir)) {
    rmSync(cacheDir, { force: true, recursive: true });
}
