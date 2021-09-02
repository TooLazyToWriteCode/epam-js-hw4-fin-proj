import { join } from "path";
import fs from "fs";

const cacheDir = join(__dirname, "..", "out", "cache");

if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { force: true, recursive: true });
}
