import { mount } from "@cypress/react";

import Caught from "@/components/pages/Caught";

describe("pages/Caught", () => {
    it("mounts without errors", () => {
        mount(<Caught />);
    });
});
