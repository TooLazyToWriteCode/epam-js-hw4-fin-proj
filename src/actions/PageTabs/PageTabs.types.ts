import { Action } from "redux";

import { PageTabsState } from "@/states/PageTabs/PageTabs.types";

export type PageTabsAction = Action<string> & PageTabsState;
