import fs from "fs";
import { join } from "path";

const testOutputDir = join(__dirname, "..", "out", "test");
const coverageDir = join(testOutputDir, "coverage");
const nycOutputDir = join(testOutputDir, ".nyc_output");

if (fs.existsSync(coverageDir)) {
    fs.rmSync(coverageDir, { force: true, recursive: true });
}

if (fs.existsSync(nycOutputDir)) {
    fs.rmSync(nycOutputDir, { force: true, recursive: true });
}
