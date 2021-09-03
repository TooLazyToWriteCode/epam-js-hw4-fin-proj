import { BrowserRouter, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

const Home = loadable(() => import("@/components/pages/Home"));

/** The pages router. */
export const Router: React.FC<{}> = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" children={<Home />} />
        </Switch>
    </BrowserRouter>
);

export default Router;
