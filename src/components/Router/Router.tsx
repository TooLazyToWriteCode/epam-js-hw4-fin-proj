import { BrowserRouter, Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";

import styles from "./Router.scss";

const Home = loadable(() => import("@/components/pages/Home"));

/** The pages router. */
export const Router: React.FC<{}> = () => (
    <div className={styles.wrap}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" children={<Home />} />
            </Switch>
        </BrowserRouter>
    </div>
);

export default Router;
