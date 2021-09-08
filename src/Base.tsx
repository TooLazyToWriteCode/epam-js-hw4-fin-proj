import { App } from "@/components/App";
import { wrapIntoReduxProvider } from "@/providers/redux";
import { wrapIntoBrowserRouter } from "@/providers/router";
import { wrapIntoThemeProvider } from "@/providers/theme";

import "./Base.css";

export const Base = wrapIntoThemeProvider(
    wrapIntoBrowserRouter(wrapIntoReduxProvider(<App />))
);
