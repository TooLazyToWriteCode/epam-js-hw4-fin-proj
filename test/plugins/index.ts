import { startDevServer } from "@cypress/webpack-dev-server";

// @ts-ignore TS7016
import codeCoveragePlugin from "@cypress/code-coverage/task";
import "cypress";

import webpackFunction from "../../webpack.config";

export const pluginConfig: Cypress.PluginConfig = (on, config) => {
    codeCoveragePlugin(on, config);

    // The `load-webpack` plugin does not seem to support TypeScript
    // webpack configs, so we have to load the config directly and
    // configure the environment manually instead of relying on it.
    config.env.reactDevtools = true;

    const webpackConfig = webpackFunction({ WEBPACK_SERVE: "on" });

    on("dev-server:start", (options) => {
        return startDevServer({ options, webpackConfig });
    });

    return config;
};

export default pluginConfig;
