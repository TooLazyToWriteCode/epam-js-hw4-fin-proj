export const replaceID = (str: string, id: string): string => {
    return str.replaceAll(":id", id);
};

export const replacePage = (str: string, page: number): string => {
    return str.replaceAll(":page", page.toString());
};
