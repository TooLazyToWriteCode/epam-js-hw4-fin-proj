import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

// @ts-ignore TS7016
import incstr from "incstr";
import webpack from "webpack";

export default (
    env: NodeJS.ProcessEnv = {},
    argv: NodeJS.ProcessEnv = {}
): webpack.Configuration => {
    let isDev = false;
    let isProd = false;
    let mode: "production" | "development";

    // We will use the development mode by default instead of how webpack
    // handles such setting and treat the `none` mode as the development
    // one. Production pipelines should specify the mode explicitly anyway.
    if (argv.mode === "production") {
        isProd = true;
        mode = "production";
    } else {
        isDev = true;
        mode = "development";
    }

    const outputDir = `${__dirname}/out/build/${mode}`;
    const publicDir = `${__dirname}/public`;
    const sourceDir = `${__dirname}/src`;

    const filePath = isProd ? "" : "[path]";
    const filename = isProd ? "[contenthash]" : "[name].[chunkhash]";

    const fontsMatch = /eot|otf|ttf|woff2?/;
    const imagesMatch = /a?png|avif|gif|jpe?g|svg|webp/;

    // The URL from which the application is served. It may be relative to
    // the current host name or absolute (for example, in a case of CDN).
    process.env.BASE_URL = process.env.BASE_URL || "/";

    const dynPlugins: webpack.WebpackPluginInstance[] = [];

    // `webpack-dev-server`, instead of writing a bundle to a hard drive, keeps
    // it in memory to increase performance. The problem is that it only serves
    // files from the `output.path` and `devServer.static` directories, and the
    // in-memory HTML file does not get served as it is located one directory
    // up from `output.path`. To fix this, we will set `output.path` to the root
    // path in a case `webpack-dev-server` is run.
    let outputPath = outputDir;
    let publicPath = process.env.BASE_URL;

    if (!env.WEBPACK_SERVE) {
        /** @see https://npmjs.com/package/clean-webpack-plugin */
        dynPlugins.push(new CleanWebpackPlugin());

        outputPath = `${outputDir}/assets`;
        publicPath = `${process.env.BASE_URL}assets/`;
    }

    if (isDev) {
        /** @see https://npmjs.com/package/webpack-manifest-plugin */
        dynPlugins.push(new WebpackManifestPlugin({}));
    }

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
                    ? incstr.idGenerator({ prefix: "m_" })
                    : undefined,
            },
        },
    };

    return {
        mode,
        devServer: { hot: true, static: publicDir },
        devtool: isProd ? false : "source-map",
        entry: { app: `${sourceDir}/index.ts` },
        module: {
            rules: [
                {
                    test: /\.(sa|s?c)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        cssLoader,
                        "sass-loader",
                    ],
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
            minimizer: [
                new TerserWebpackPlugin({
                    terserOptions: { toplevel: true },
                }),
            ],
        },
        output: {
            filename: `${filename}.js`,
            path: outputPath,
            publicPath: publicPath,
        },
        plugins: [
            /** @see https://webpack.js.org/plugins/copy-webpack-plugin */
            new CopyWebpackPlugin({
                patterns: [{ from: publicDir, to: outputDir }],
            }),

            /** @see https://webpack.js.org/plugins/html-webpack-plugin */
            new HTMLWebpackPlugin({
                filename: `${outputDir}/index.html`,
                template: `${sourceDir}/index.ejs`,
                title: "Poke Catch",
            }),

            /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
            new MiniCSSExtractPlugin({ filename: `"${filename}.css` }),

            /** @see https://webpack.js.org/plugins/environment-plugin */
            new webpack.EnvironmentPlugin(["BASE_URL"]),
        ].concat(dynPlugins),
        resolve: {
            // Map the directories as some other string. Note: this
            // mapping should also be set in the TypeScript config.
            alias: { "@": sourceDir },
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        stats: {
            assets: false,
            chunks: false,
            entrypoints: false,
            modules: false,
        },
    };
};
