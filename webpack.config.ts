import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

import webpack from "webpack";

export default (
    env: NodeJS.ProcessEnv,
    _argv: NodeJS.ProcessEnv
): webpack.Configuration => {
    let dynPlugins: webpack.WebpackPluginInstance[] = [];

    if (!env.WEBPACK_SERVE) {
        /** @see https://npmjs.com/package/clean-webpack-plugin */
        dynPlugins.push(new CleanWebpackPlugin());
    }

    return {
        devServer: { hot: true },
        entry: { app: `${__dirname}/src/index.ts` },
        output: {
            filename: "[name].[fullhash].js",

            // I think eight is enough for a hash -- it should
            // not collide with old hashes and is not lengthy.
            hashDigestLength: 8,
            path: `${__dirname}/out/build/assets`,
            publicPath: "/assets/",
        },
        plugins: [
            /** @see https://webpack.js.org/plugins/mini-css-extract-plugin */
            new MiniCSSExtractPlugin({ filename: "[name].[fullhash].css" }),

            /** @see https://npmjs.com/package/webpack-manifest-plugin */
            new WebpackManifestPlugin({}),
        ].concat(dynPlugins),
    };
};
