import { App } from "@/components/App";
import { wrapIntoReduxProvider } from "@/providers/redux";
import { wrapIntoBrowserRouter } from "@/providers/router";

import "./Base.css";

export const Base = wrapIntoReduxProvider(wrapIntoBrowserRouter(<App />));
