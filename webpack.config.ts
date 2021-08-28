import webpack from "webpack";

export default (
    _env: NodeJS.ProcessEnv,
    _argv: NodeJS.ProcessEnv
): webpack.Configuration => {
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
    };
};
