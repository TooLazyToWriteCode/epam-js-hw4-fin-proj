import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/store";
import Caught from "@/components/pages/Caught";
import Home from "@/components/pages/Home";
import Pokemon from "@/components/pages/Pokemon";
import "./App.scss";

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
