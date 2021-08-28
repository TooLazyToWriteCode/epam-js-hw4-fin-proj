import { startDevServer } from "@cypress/webpack-dev-server";

// @ts-ignore TS7016
import codeCoveragePlugin from "@cypress/code-coverage/task";
import "cypress";

import webpackFunction from "../../webpack.config";

export const pluginConfig: Cypress.PluginConfig = (on, config) => {
    codeCoveragePlugin(on, config);

    // The `load-webpack` plugin does not seem to support
    // TypeScript config, so we have to load the webpack
    // config directly and set the environment manually.
    config.env.reactDevtools = true;

    const webpackConfig = webpackFunction({ WEBPACK_SERVE: "true" });

    on("dev-server:start", (options) => {
        return startDevServer({ options, webpackConfig });
    });

    return config;
};

export default pluginConfig;
