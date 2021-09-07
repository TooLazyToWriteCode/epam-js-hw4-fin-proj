import { pages } from "@/config/Pages";
import { Location } from "@/types/location";

import { PageTabsAction } from "./PageTabs.types";

export const changePageTab = (location: Location): PageTabsAction => {
    const type = "CHANGE_PAGE_TAB";

    switch (location.pathname.replace(/(?!^)\/$/, "")) {
        case pages.home.path:
            return { type, tab: 0 };
        case pages.caught.path:
            return { type, tab: 1 };
        default:
            return { type, tab: false };
    }
};
