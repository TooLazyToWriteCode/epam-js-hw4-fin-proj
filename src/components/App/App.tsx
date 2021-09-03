import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import loadable from "@loadable/component";

import { store } from "@/store";
import "./App.scss";

const Home = loadable(() => import("@/components/pages/Home"));

/** The root component. */
export const App: React.ReactElement = (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" children={<Home />} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default App;
