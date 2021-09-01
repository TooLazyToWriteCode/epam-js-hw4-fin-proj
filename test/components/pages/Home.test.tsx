import { mount } from "@cypress/react";

import Home from "@/components/pages/Home";

describe("pages/Home", () => {
    it("mounts without errors", () => {
        mount(<Home />);
    });
});
