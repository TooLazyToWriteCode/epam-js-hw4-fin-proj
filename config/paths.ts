import { join } from "path";

// In a case of a path change, please consider that even though this is the
// main path defintion file, it is not the only place where they are stored.
// Path definitions outside of this file include:
// -   All the test paths (both for input and output). They are defined in the
//     cypress.json file in the root directory.
// -   The relative ES import paths. They must be string literals, so they are
//     hardcoded. However, most can be found by searching for the `".` pattern.
// -   The ignored paths in the `.*ignore` files and `tsconfig.json`.
// -   The Yarn paths in `.vim/coc-settings.json`, `.vscode/settings.json` and
//     `.yarnrc.yml`.

export const rootDir = join(__dirname, "..");
export const outDir = join(rootDir, "out");
export const publicDir = join(rootDir, "public");
export const serverDir = join(rootDir, "server");
export const srcDir = join(rootDir, "src");

export const outBuildDir = join(outDir, "build");
export const outDocDir = join(outDir, "doc");

export const srcDBFile = join(serverDir, "db.json");

export const srcFiles = join(srcDir, "**", "*.ts{,x}");
