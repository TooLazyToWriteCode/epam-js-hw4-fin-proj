import { Route, Switch } from "react-router-dom";
import Header from "@/components/sections/Header";
import loadable from "@loadable/component";

import pages from "@/pages";
import styles from "./App.scss";

const Caught = loadable(() => import("@/components/pages/Caught"));
const Error404 = loadable(() => import("@/components/pages/Error404"));
const Home = loadable(() => import("@/components/pages/Home"));

/** The root component with the router. */
export const App: React.FC<{}> = () => (
    <div className={styles.wrap}>
        <Header />
        <Switch>
            <Route path={pages.caught.path} children={<Caught />} />
            <Route path={pages.home.path} children={<Home />} exact />
            <Route path={pages.error404.path} children={<Error404 />} />
        </Switch>
    </div>
);

export default App;
