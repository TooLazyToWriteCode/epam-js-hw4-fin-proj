// @ts-ignore TS7016
import codeCoveragePlugin from "@cypress/code-coverage/task";
import { startDevServer } from "@cypress/webpack-dev-server";
import "cypress";

import webpackFunction from "../../webpack.config";

const addStartDevServerEvent = (on: Cypress.PluginEvents): void => {
    const argv = { mode: "development" };
    const env = { WEBPACK_SERVE: "on" };

    const webpackConfig = webpackFunction(env, argv);

    on("dev-server:start", (options) => {
        return startDevServer({ options, webpackConfig });
    });
};

export const pluginConfig: Cypress.PluginConfig = (on, config) => {
    codeCoveragePlugin(on, config);

    // The `load-webpack` plugin does not seem to support TypeScript
    // webpack configs, so we have to load the config directly and
    // configure the environment manually instead of relying on it.
    config.env.reactDevtools = true;

    addStartDevServerEvent(on);
    return config;
};

export default pluginConfig;
