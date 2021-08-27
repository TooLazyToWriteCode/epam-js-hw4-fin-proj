import { join } from "path";

export const rootDir = join(__dirname, "..");
export const outDir = join(rootDir, "out");
export const publicDir = join(rootDir, "public");
export const serverDir = join(rootDir, "server");
export const srcDir = join(rootDir, "src");

export const outBuildDir = join(outDir, "build");
export const outDocDir = join(outDir, "doc");

export const srcDBFile = join(serverDir, "db.json");

export const srcFiles = join(srcDir, "**", "*.ts{,x}");
