import { BrowserRouter, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import Header from "@/components/sections/Header";
import pages from "@/pages";

const Caught = loadable(() => import("@/components/pages/Caught"));
const Error404 = loadable(() => import("@/components/pages/Error404"));
const Home = loadable(() => import("@/components/pages/Home"));

/** The pages router. */
export const Router: React.FC<{}> = () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path={pages.caught.path} children={<Caught />} />
            <Route path={pages.home.path} children={<Home />} exact />
            <Route path={pages.error404.path} children={<Error404 />} />
        </Switch>
    </BrowserRouter>
);

export default Router;
