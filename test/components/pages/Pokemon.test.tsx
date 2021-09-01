import { MemoryRouter } from "react-router-dom";
import { mount } from "@cypress/react";

import Pokemon from "@/components/pages/Pokemon";

describe("pages/Pokemon", () => {
    it("mounts without errors", () => {
        mount(
            <MemoryRouter initialEntries={["/pokemon/1"]}>
                <Pokemon />
            </MemoryRouter>
        );
    });
});
