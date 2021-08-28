import { mount } from "@cypress/react";
import App from "@/App";

describe("App", () => {
    it("mounts", () => {
        mount(App);
    });
});
