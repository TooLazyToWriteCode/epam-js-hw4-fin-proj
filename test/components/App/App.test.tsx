import { mount } from "@cypress/react";

import App from "@/components/App";

describe("App", () => {
    it("mounts without errors", () => {
        mount(App);
    });
});
