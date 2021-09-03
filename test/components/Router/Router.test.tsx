import { mount } from "@cypress/react";

import Router from "@/components/Router";

describe("Router", () => {
    it("mounts without errors", () => {
        mount(<Router />);
    });
});
