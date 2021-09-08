import { replaceID } from "../Replace";

export interface Params {
    id?: string;
}

export const getUnglobbedPath = (path: string): string => {
    return path === "*" ? "/this-path-does-not-exist" : path;
};

export const getNormalPath = (path: string, params: Params = {}): string => {
    params.id = params.id || "1";

    return replaceID(getUnglobbedPath(path), params.id);
};
