import { BrowserRouter, MemoryRouter } from "react-router-dom";

export const wrapIntoBrowserRouter = (
    element: React.ReactElement
): React.ReactElement => {
    return <BrowserRouter>{element}</BrowserRouter>;
};

export const wrapIntoMemoryRouter = (
    element: React.ReactElement,
    initURLs: string[]
): React.ReactElement => {
    return <MemoryRouter initialEntries={initURLs}>{element}</MemoryRouter>;
};
