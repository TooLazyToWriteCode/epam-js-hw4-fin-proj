import { mount } from "@cypress/react";

import { wrapIntoReduxProvider } from "@/providers/redux";
import { wrapIntoMemoryRouter } from "@/providers/router";
import { wrapIntoThemeProvider } from "@/providers/theme";

export const mountPage = (urls: string[], node: React.ReactNode): void => {
    node = wrapIntoReduxProvider(node);
    node = wrapIntoMemoryRouter(node, urls);
    node = wrapIntoThemeProvider(node);

    mount(node);
};
