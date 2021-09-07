import CopyWebpackPlugin from "copy-webpack-plugin";
import TSCheckerPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import { join } from "path";
import TerserWebpackPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

type Argv = NodeJS.ProcessEnv;
type Cache = webpack.Configuration["cache"];
type Env = NodeJS.ProcessEnv;
type Output = webpack.Configuration["output"];
type Plugin = webpack.WebpackPluginInstance;
type Use = webpack.RuleSetUseItem;

interface Mode {
    isDev: boolean;
    isProd: boolean;
    mode: "production" | "development";
}

const stringReplaceAt = (str: string, at: number, char: string): string => {
    return str.slice(0, at) + char + str.slice(at + 1, str.length);
};

const classNameNextChar = (current: string): string => {
    const charCode = current.charCodeAt(0);

    switch (charCode) {
        case "9".charCodeAt(0):
            return "a";
        case "z".charCodeAt(0):
            return "A";
        case "Z".charCodeAt(0):
            return "0";
        default:
    }

    return String.fromCharCode(charCode + 1);
};

const classNameNextName = (current: string): string => {
    for (let index = current.length - 1; index >= 0; --index) {
        const next = classNameNextChar(current[index]);

        current = stringReplaceAt(current, index, next);

        if (next !== "0") {
            break;
        }

        if (index === 0) {
            current = "0" + current;
        }
    }

    return current;
};

function* classNameGenerate() {
    let name = "0";

    yield name;

    while (1) {
        name = classNameNextName(name);

        yield name;
    }
}

const getBabelPlugins = (isDev: boolean): string[] => {
    const plugins: string[] = [];

    if (isDev) {
        plugins.push("istanbul");
    }

    return plugins;
};

const getBaseURL = (): string => {
    const noSlashError = new Error('the BASE_URL variable must end with "/"');

    // The URL from which the application is served. It may be either relative
    // to the current hostname or absolute (for example, in a case CDN is used).
    const url = process.env.BASE_URL || "/";

    if (!url.endsWith("/")) {
        throw noSlashError;
    }

    return url;
};

const getCache = (dir: string, env: Env): Cache => {
    const fileCache: Cache = {
        cacheLocation: dir,
        type: "filesystem",
    };

    const memoryCache: Cache = {
        type: "memory",
    };

    return env.WEBPACK_SERVE ? memoryCache : fileCache;
};

const getDevServerPort = (): number | string => {
    return Number(process.env.PORT) || "auto";
};

const getDynamicCSSLoaders = (mode: Mode): Use[] => {
    const use: Use[] = [];

    if (mode.isDev) {
        use.push("style-loader");
    }

    if (mode.isProd) {
        use.push(MiniCSSExtractPlugin.loader);
    }

    return use;
};

const getDynamicPlugins = (mode: Mode, filename: string): Plugin[] => {
    const plugins: Plugin[] = [];

    if (mode.isDev) {
        /** @see https://npmjs.com/package/webpack-manifest-plugin */
        plugins.push(new WebpackManifestPlugin({}));
    }

    if (mode.isProd) {
        /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
        plugins.push(new MiniCSSExtractPlugin({ filename: `${filename}.css` }));
    }

    return plugins;
};

const getMode = (argv: Argv): Mode => {
    const error = new Error("the mode is invalid or not explicitly set");

    const mode: Mode = {
        isDev: false,
        isProd: false,
        mode: "production",
    };

    switch (argv.mode) {
        case "development":
            mode.isDev = true;
            mode.mode = "development";
            break;
        case "production":
            mode.isProd = true;
            mode.mode = "production";
            break;
        default:
            throw error;
    }

    return mode;
};

const getOutput = (baseURL: string, buildDir: string, env: Env): Output => {
    const output: Output = {};

    // `webpack-dev-server`, instead of writing a bundle to a hard drive, keeps
    // it in memory to increase performance. The problem is that it only serves
    // files from the `output.path` and `devServer.static` directories, and the
    // in-memory HTML file does not get served as it is located one directory
    // up from `output.path`. To fix this, we will set `output.path` to the root
    // path in a case `webpack-dev-server` is run.
    output.path = env.WEBPACK_SERVE ? buildDir : join(buildDir, "assets");
    output.publicPath = baseURL + (env.WEBPACK_SERVE ? "" : "assets/");

    return output;
};

export default (env: Argv = {}, argv: Env = {}): webpack.Configuration => {
    const mode = getMode(argv);
    const baseURL = getBaseURL();

    const outputDir = join(__dirname, "out");
    const publicDir = join(__dirname, "public");
    const sourceDir = join(__dirname, "src");
    const tsConfigFile = join(__dirname, "tsconfig.json");

    const assetsDir = join(sourceDir, "assets");
    const buildRootDir = join(outputDir, "build");
    const buildDir = join(buildRootDir, mode.mode);
    const cacheRootDir = join(outputDir, "cache");
    const cacheDir = join(cacheRootDir, "webpack", mode.mode);

    const filePath = mode.isProd ? "" : "[path]";
    const filename = `${mode.isProd ? "" : "[name]."}[contenthash]`;
    const fontsRegexp = /\.(eot|otf|ttf|woff2?)$/;
    const imagesRegexp = /\.(a?png|avif|gif|ico|jpe?g|svg|webp)$/;

    const classNameGenerator = classNameGenerate();

    const cssLoader: webpack.RuleSetRule = {
        loader: "css-loader",
        options: {
            // Mangle the class names of the CSS modules.
            // Read this article to understand it better:
            // https://freecodecamp.org/news/625440de600b.
            modules: {
                localIdentName: "[path][name]__[local]",
                getLocalIdent: mode.isProd
                    ? () => "m_" + classNameGenerator.next().value
                    : undefined,
            },
        },
    };

    return {
        cache: getCache(cacheDir, env),
        context: env.WEBPACK_SERVE ? sourceDir : assetsDir,
        devtool: mode.isProd ? false : "source-map",
        entry: { app: join(sourceDir, "index.ts") },
        mode: mode.mode,
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: getDevServerPort(),
            static: publicDir,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: getDynamicCSSLoaders(mode).concat([cssLoader]),
                },
                {
                    test: /\.tsx?$/,
                    loader: "babel-loader",
                    options: {
                        compact: false,
                        plugins: getBabelPlugins(mode.isDev),
                    },
                },
                {
                    test: [fontsRegexp, imagesRegexp],
                    type: "asset/resource",
                },
            ],
        },
        optimization: {
            runtimeChunk: true,
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: { toplevel: true },
                }),
            ],
        },
        output: {
            ...getOutput(baseURL, buildDir, env),
            assetModuleFilename: `${filePath}${filename}[ext][query]`,
            clean: true,
            filename: `${filename}.js`,
        },
        plugins: getDynamicPlugins(mode, filename).concat([
            /** @see https://webpack.js.org/plugins/copy-webpack-plugin */
            new CopyWebpackPlugin({
                patterns: [{ from: publicDir, to: buildDir }],
            }),

            /** @see https://webpack.js.org/plugins/html-webpack-plugin */
            new HTMLWebpackPlugin({
                filename: join(buildDir, "index.html"),
                template: join(sourceDir, "index.ejs"),
                title: "Poke Catch",
            }),

            /** @see https://npmjs.com/package/fork-ts-checker-webpack-plugin */
            new TSCheckerPlugin({
                typescript: { configFile: tsConfigFile },
            }),

            /** @see https://webpack.js.org/plugins/define-plugin */
            new webpack.DefinePlugin({
                "process.env.BASE_URL": JSON.stringify(baseURL),

                // The URL of the server with the API.
                "process.env.SERVER_URL": JSON.stringify(
                    "http://localhost:3333"
                ),

                // `:page` will be replaced with a page number. The server must
                // accept this number and return the corresponding page.
                "process.env.SERVER_GET_CAUGHT_POKEMONS": JSON.stringify(
                    "/pokemons?caught_like=true&_limit=20&_page=:page"
                ),

                // `:id` will be replaced with a pokemon ID. The server must
                // accept this number along with the updated pokemon record as a
                // JSON data object and return the status of the request.
                "process.env.SERVER_PUT_POKEMON":
                    JSON.stringify("/pokemons/:id"),

                // `:id` will be replaced with a pokemon ID. The server must
                // accept this number and return either the corresponding image
                // or the 404 Not Found error page.
                "process.env.SERVER_GET_POKEMON_IMAGE":
                    JSON.stringify("/images/:id.png"),

                // `:page` will be replaced with a page number. The server must
                // accept this number and return the corresponding page.
                "process.env.SERVER_GET_POKEMONS": JSON.stringify(
                    "/pokemons?_limit=20&_page=:page"
                ),
            }),
        ]),
        resolve: {
            // Map the directories as some other string. Note: this
            // mapping should also be set in the TypeScript config.
            alias: { "@": sourceDir },
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            symlinks: false,
        },
        stats: {
            assets: false,
            chunks: false,
            entrypoints: false,
            modules: false,
        },
    };
};
