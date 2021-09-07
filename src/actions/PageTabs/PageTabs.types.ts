import { Action } from "redux";

export interface PageTabsBaseAction {
    tab: number | false;
}

export type PageTabsAction = Action<string> & PageTabsBaseAction;
