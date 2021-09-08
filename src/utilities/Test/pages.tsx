import { pages } from "../../config/Pages";
import { Page } from "../../config/Pages/Pages.types";

export type PagesCallback = (name: string, page: Page) => void;

export const goThroughPages = (callback: PagesCallback): void => {
    Object.entries(pages).forEach(([name, page]: [string, Page]) => {
        return callback(name, page);
    });
};
