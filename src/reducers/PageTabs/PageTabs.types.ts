import { Reducer } from "redux";

import { PageTabsAction } from "@/actions/PageTabs/PageTabs.types";
import { PageTabsState } from "@/states/PageTabs/PageTabs.types";

export type PageTabsReducer = Reducer<PageTabsState, PageTabsAction>;
