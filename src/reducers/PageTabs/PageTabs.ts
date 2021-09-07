import { initial } from "@/states/PageTabs";

import { PageTabsReducer } from "./PageTabs.types";

export const pageTabsReducer: PageTabsReducer = (state = initial, action) => {
    switch (action.type) {
        case "CHANGE_PAGE_TAB":
            return { ...state, tab: action.tab };
        default:
            return state;
    }
};
