import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";

import webpack from "webpack";

export default (
    env: NodeJS.ProcessEnv,
    argv: NodeJS.ProcessEnv
): webpack.Configuration => {
    const envName = argv.mode || "production";
    const isProd = envName === "production";

    const outputDir = `${__dirname}/out/build/${envName}`;

    let dynPlugins: webpack.WebpackPluginInstance[] = [];

    if (!env.WEBPACK_SERVE) {
        /** @see https://npmjs.com/package/clean-webpack-plugin */
        dynPlugins.push(new CleanWebpackPlugin());
    }

    return {
        devServer: { hot: true },
        devtool: isProd ? false : "source-map",
        entry: { app: `${__dirname}/src/index.ts` },
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
            path: `${outputDir}/assets`,
            publicPath: "/assets/",
        },
        plugins: [
            /** @see https://webpack.js.org/plugins/copy-webpack-plugin */
            new CopyWebpackPlugin({
                patterns: [{ from: `${__dirname}/public`, to: outputDir }],
            }),

            /** @see https://webpack.js.org/plugins/html-webpack-plugin */
            new HTMLWebpackPlugin({
                filename: `${outputDir}/index.html`,
                template: `${__dirname}/src/index.ejs`,
                title: "Poke Catch",
            }),

            /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
            new MiniCSSExtractPlugin({ filename: "[name].[fullhash].css" }),

            /** @see https://npmjs.com/package/webpack-manifest-plugin */
            new WebpackManifestPlugin({}),
        ].concat(dynPlugins),
    };
};
