import fs from "fs";
import { join } from "path";

const cacheDir = join(__dirname, "..", "out", "cache");

if (fs.existsSync(cacheDir)) {
    fs.rmSync(cacheDir, { force: true, recursive: true });
}
