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
    env: NodeJS.ProcessEnv,
    argv: NodeJS.ProcessEnv
): webpack.Configuration => {
    const envName = argv.mode || "production";
    const isProd = envName === "production";

    const outputDir = `${__dirname}/out/build/${envName}`;
    const sourceDir = `${__dirname}/src`;

    const fontsMatch = /eot|otf|ttf|woff2?/;
    const imagesMatch = /a?png|avif|gif|jpe?g|svg|webp/;

    const dynPlugins: webpack.WebpackPluginInstance[] = [];

    // `webpack-dev-server`, instead of writing a bundle to a hard drive, keeps
    // it in memory to increase performance. The problem is that it only serves
    // files from the `output.path` directory and some other real filesystem
    // locations, and the in-memory HTML file does not get served as it is
    // located one directory above `output.path`. To fix this, we will use the
    // root path as `output.path` in a case `webpack-dev-server` is run.
    let outputPath = outputDir;
    let publicPath = "/";

    if (!env.WEBPACK_SERVE) {
        /** @see https://npmjs.com/package/clean-webpack-plugin */
        dynPlugins.push(new CleanWebpackPlugin());

        outputPath = `${outputDir}/assets`;
        publicPath = "/assets/";
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
        devServer: { hot: true },
        devtool: isProd ? false : "source-map",
        entry: { app: `${sourceDir}/index.ts` },
        module: {
            rules: [
                {
                    test: /\.(c|sa|sc)ss$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        cssLoader,
                        "sass-loader",
                    ],
                },
                {
                    test: /\.ts(|x)$/,
                    use: [babelLoader, "ts-loader"],
                },
                {
                    test: new RegExp(`\\.(${fontsMatch}|${imagesMatch})$`),
                    loader: "file-loader",
                    options: { name: "[path][name].[fullhash].[ext]" },
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
            filename: "[name].[fullhash].js",

            // I think eight is enough for a hash -- it should
            // not collide with old hashes and is not lengthy.
            hashDigestLength: 8,
            path: outputPath,
            publicPath: publicPath,
        },
        plugins: [
            /** @see https://webpack.js.org/plugins/copy-webpack-plugin */
            new CopyWebpackPlugin({
                patterns: [{ from: `${__dirname}/public`, to: outputDir }],
            }),

            /** @see https://webpack.js.org/plugins/html-webpack-plugin */
            new HTMLWebpackPlugin({
                filename: `${outputDir}/index.html`,
                template: `${sourceDir}/index.ejs`,
                title: "Poke Catch",
            }),

            /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
            new MiniCSSExtractPlugin({ filename: "[name].[fullhash].css" }),

            /** @see https://npmjs.com/package/webpack-manifest-plugin */
            new WebpackManifestPlugin({}),
        ].concat(dynPlugins),
        resolve: {
            // Map the directories as some other string. Note: this
            // mapping should also be set in the TypeScript config.
            alias: { "@": sourceDir },
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
    };
};
