import { RmOptions, existsSync, rmSync } from "fs";
import { join } from "path";

const testOutputDir: string = join(__dirname, "..", "out", "test");
const coverageDir: string = join(testOutputDir, "coverage");
const nycOutputDir: string = join(testOutputDir, ".nyc_output");
const rmOptions: RmOptions = { force: true, recursive: true };

if (existsSync(coverageDir)) {
    rmSync(coverageDir, rmOptions);
}

if (existsSync(nycOutputDir)) {
    rmSync(nycOutputDir, rmOptions);
}
