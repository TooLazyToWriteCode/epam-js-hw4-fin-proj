import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CSSExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

// @ts-ignore TS7016
import { idGenerator } from "incstr";
import { join } from "path";
import webpack from "webpack";

export default (
    env: NodeJS.ProcessEnv = {},
    argv: NodeJS.ProcessEnv = {}
): webpack.Configuration => {
    let isDev = false;
    let isProd = false;
    let mode: "production" | "development";

    switch (argv.mode) {
        case "development":
            isDev = true;
            mode = "development";
            break;
        case "production":
            isProd = true;
            mode = "production";
            break;
        default:
            throw new Error("the mode is invalid or not explicitly set");
    }

    const outputDir = join(__dirname, "out");
    const cacheDir = join(outputDir, "cache", "webpack", mode);
    const buildDir = join(outputDir, "build", mode);
    const publicDir = join(__dirname, "public");
    const sourceDir = join(__dirname, "src");

    const filePath = isProd ? "" : "[path]";
    const filename = isProd ? "[contenthash]" : "[name].[chunkhash]";

    const fontsMatch = /eot|otf|ttf|woff2?/;
    const imagesMatch = /a?png|avif|gif|jpe?g|svg|webp/;

    const port = Number(process.env.PORT || 3030);

    // The URL from which the application is served. It may be relative to
    // the current host name or absolute (for example, in a case of CDN).
    process.env.BASE_URL = process.env.BASE_URL || "/";

    if (!process.env.BASE_URL.endsWith("/")) {
        throw new Error('the BASE_URL environment variable must end with "/"');
    }

    process.env.SERVER_HOST = process.env.SERVER_HOST || "localhost";
    process.env.SERVER_PORT = process.env.SERVER_PORT || "3031";

    const dynPlugins: webpack.WebpackPluginInstance[] = [];

    if (isDev) {
        /** @see https://npmjs.com/package/webpack-manifest-plugin */
        dynPlugins.push(new WebpackManifestPlugin({}));
    }

    // `webpack-dev-server`, instead of writing a bundle to a hard drive, keeps
    // it in memory to increase performance. The problem is that it only serves
    // files from the `output.path` and `devServer.static` directories, and the
    // in-memory HTML file does not get served as it is located one directory
    // up from `output.path`. To fix this, we will set `output.path` to the root
    // path in a case `webpack-dev-server` is run.
    const buildPath = env.WEBPACK_SERVE ? buildDir : join(buildDir, "assets");
    const publicURL = process.env.BASE_URL + env.WEBPACK_SERVE ? "" : "assets/";

    const fileCache: webpack.Configuration["cache"] = {
        cacheLocation: cacheDir,
        type: "filesystem",
    }

    const memoryCache: webpack.Configuration["cache"] = {
        type: "memory",
    }

    const cache = env.WEBPACK_SERVE ? memoryCache : fileCache;

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
        cache,
        devtool: isProd ? false : "source-map",
        entry: { app: join(sourceDir, "index.ts") },
        devServer: {
            port,
            historyApiFallback: true,
            hot: true,
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
                    test: new RegExp(`\\.(${fontsMatch}|${imagesMatch})$`),
                    loader: "file-loader",
                    options: { name: `${filePath}${filename}.[ext]` },
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
            clean: true,
            filename: `${filename}.js`,
            path: buildPath,
            publicPath: publicURL,
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
            new CSSExtractPlugin({ filename: `"${filename}.css` }),

            /** @see https://webpack.js.org/plugins/environment-plugin */
            new webpack.EnvironmentPlugin([
                "BASE_URL",
                "SERVER_HOST",
                "SERVER_PORT",
            ]),
        ].concat(dynPlugins),
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
