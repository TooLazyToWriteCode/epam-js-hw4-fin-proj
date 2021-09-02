import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import loadable from "@loadable/component";

import { store } from "@/store";
import "./App.scss";

const Home = loadable(() => import("@/components/pages/Home"));

/** The root component. */
export const App: React.ReactElement = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" children={<Home />} />
            </Switch>
        </BrowserRouter>
    </ReduxProvider>
);

export default App;
