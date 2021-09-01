import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CSSExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

// @ts-ignore TS7016
import { idGenerator } from "incstr";
import { join } from "path";
import webpack from "webpack";

type Argv = NodeJS.ProcessEnv;
type Cache = webpack.Configuration["cache"];
type Env = NodeJS.ProcessEnv;
type Output = webpack.Configuration["output"];
type Plugin = webpack.WebpackPluginInstance;

interface Mode {
    isDev: boolean;
    isProd: boolean;
    mode: "production" | "development";
}

const getCache = (dir: string, env: Env, mode: Mode["mode"]): Cache => {
    const fileCache: Cache = {
        cacheLocation: dir,
        type: "filesystem",
    };

    const memoryCache: Cache = {
        type: "memory",
    };

    return env.WEBPACK_SERVE ? memoryCache : fileCache;
};

const getDynPlugins = (isDev: Mode["isDev"]): Plugin[] => {
    const plugins: Plugin[] = [];

    if (isDev) {
        /** @see https://npmjs.com/package/webpack-manifest-plugin */
        plugins.push(new WebpackManifestPlugin({}));
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

const getDevServerPort = (): number => {
    return Number(process.env.PORT === undefined ? 3030 : process.env.PORT);
};

const getBaseURL = (): string => {
    const noSlashError = new Error('the BASE_URL variable must end with "/"');

    // The URL from which the application is served. It may be either relative
    // to the current hostname or absolute (for example, in a case CDN is used).
    const url = process.env.BASE_URL === undefined ? "/" : process.env.BASE_URL;

    if (!url.endsWith("/")) {
        throw noSlashError;
    }

    return url;
};

export default (env: Argv = {}, argv: Env = {}): webpack.Configuration => {
    const { isDev, isProd, mode } = getMode(argv);
    const baseURL = getBaseURL();

    const outputDir = join(__dirname, "out");
    const publicDir = join(__dirname, "public");
    const sourceDir = join(__dirname, "src");

    const assetsDir = join(sourceDir, "assets");
    const buildDir = join(outputDir, "build", mode);
    const cacheDir = join(outputDir, "cache", "webpack", mode);

    const filePath = isProd ? "" : "[path]";
    const filename = `${isProd ? "" : "[name]."}[contenthash]`;
    const fontsRegexp = /\.(eot|otf|ttf|woff2?)$/;
    const imagesRegexp = /\.(a?png|avif|gif|jpe?g|svg|webp)$/;

    const babelLoader: webpack.RuleSetRule = {
        loader: "babel-loader",
        options: { compact: false },
    };

    const cssLoader: webpack.RuleSetRule = {
        loader: "css-loader",
        options: {
            // Mangle the class names of the CSS modules.
            // Read this article to understand it better:
            // https://freecodecamp.org/news/625440de600b.
            modules: {
                localIdentName: "[path][name]__[local]",
                getLocalIdent: isProd
                    ? idGenerator({ prefix: "m_" })
                    : undefined,
            },
        },
    };

    return {
        mode,
        cache: getCache(cacheDir, env, mode),
        context: env.WEBPACK_SERVE ? sourceDir : assetsDir,
        devtool: isProd ? false : "source-map",
        entry: { app: join(sourceDir, "index.ts") },
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: getDevServerPort(),
            static: publicDir,
        },
        module: {
            rules: [
                {
                    test: /\.(sa|s?c)ss$/,
                    use: [CSSExtractPlugin.loader, cssLoader, "sass-loader"],
                },
                {
                    test: /\.tsx?$/,
                    use: [babelLoader, "ts-loader"],
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
        plugins: [
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

            /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
            new CSSExtractPlugin({ filename: `${filename}.css` }),

            /** @see https://webpack.js.org/plugins/environment-plugin */
            new webpack.EnvironmentPlugin({
                BASE_URL: baseURL,

                // The host & port of the backend server which serves the API.
                SERVER_HOST: "localhost",
                SERVER_PORT: "3031",
            }),
        ].concat(getDynPlugins(isDev)),
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
