import { join } from "path";

export const rootDir = join(__dirname, "..");
export const publicDir = join(rootDir, "public");
export const serverDir = join(rootDir, "server");
export const srcDir = join(rootDir, "src");

export const srcDBFile = join(serverDir, "db.json");
