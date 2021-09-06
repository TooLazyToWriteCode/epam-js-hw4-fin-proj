import { RmOptions, existsSync, rmSync } from "fs";
import { join } from "path";

const testOutputDir = join(__dirname, "..", "out", "test");
const coverageDir = join(testOutputDir, "coverage");
const nycOutputDir = join(testOutputDir, ".nyc_output");

const rmOptions: RmOptions = { force: true, recursive: true };

if (existsSync(coverageDir)) {
    rmSync(coverageDir, rmOptions);
}

if (existsSync(nycOutputDir)) {
    rmSync(nycOutputDir, rmOptions);
}
