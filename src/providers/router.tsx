import { BrowserRouter, MemoryRouter } from "react-router-dom";

export const wrapIntoBrowserRouter = (
    element: React.ReactNode
): React.ReactNode => {
    return <BrowserRouter>{element}</BrowserRouter>;
};

export const wrapIntoMemoryRouter = (
    element: React.ReactNode,
    initURLs: string[]
): React.ReactNode => {
    return <MemoryRouter initialEntries={initURLs}>{element}</MemoryRouter>;
};
