import { mount } from "@cypress/react";
import { MemoryRouter } from "react-router-dom";

export const mountPage = (url: string, node: React.ReactNode): void => {
    mount(<MemoryRouter initialEntries={[url]}>{node}</MemoryRouter>);
};
