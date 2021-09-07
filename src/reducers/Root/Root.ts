import { combineReducers } from "redux";

import { pageTabsReducer } from "@/reducers/PageTabs";

export const rootReducer = combineReducers({
    pageTabs: pageTabsReducer,
});
