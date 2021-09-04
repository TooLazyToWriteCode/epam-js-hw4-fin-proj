import { mount } from "@cypress/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

export const getUnglobbedPath = (path: string): string => {
    return path === "*" ? "/this-path-does-not-exist" : path;
};

export const mountPage = (url: string, node: React.ReactNode): void => {
    mount(<MemoryRouter initialEntries={[url]}>{node}</MemoryRouter>);
};
