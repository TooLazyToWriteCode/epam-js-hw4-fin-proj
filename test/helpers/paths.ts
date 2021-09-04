export interface Params {
    id?: string;
}

export const getUnglobbedPath = (path: string): string => {
    return path === "*" ? "/this-path-does-not-exist" : path;
};

export const getReplacedPath = (path: string, params: Params = {}): string => {
    return path.replaceAll(":id", params.id || "1");
};

export const getNormalPath = (path: string, params: Params = {}): string => {
    return getReplacedPath(getUnglobbedPath(path), params);
};
