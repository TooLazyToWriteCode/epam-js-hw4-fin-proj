import { PageTabsState } from "@/states/PageTabs/PageTabs.types";

import { PageTabsReducer } from "./PageTabs.types";

const defaultState: PageTabsState = { tab: false };

export const pageTabsReducer: PageTabsReducer = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case "CHANGE_PAGE_TAB":
            return { ...state, tab: action.tab };
        default:
            return state;
    }
};
