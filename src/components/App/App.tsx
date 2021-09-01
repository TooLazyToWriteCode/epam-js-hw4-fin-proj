import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import loadable from "@loadable/component";

import { store } from "@/store";
import "./App.scss";

const Caught = loadable(() => import("@/components/pages/Caught"));
const Home = loadable(() => import("@/components/pages/Home"));
const Pokemon = loadable(() => import("@/components/pages/Pokemon"));

/** The root component. */
export const App: React.ReactElement = (
    <ReduxProvider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" children={<Home />} />
                <Route path="/caught" children={<Caught />} />
                <Route path="/pokemon/:id" children={<Pokemon />} />
            </Switch>
        </BrowserRouter>
    </ReduxProvider>
);

export default App;
