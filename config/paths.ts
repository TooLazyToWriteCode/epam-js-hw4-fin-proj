import { join } from "path";

export const rootDir = join(__dirname, "..");
export const serverDir = join(rootDir, "server");

export const srcDbFile = join(serverDir, "db.json");
