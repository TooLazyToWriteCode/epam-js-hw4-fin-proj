import { Provider as ReduxProvider } from "react-redux";
import ReactRouter from "react-router-dom";
import loadable from "@loadable/component";

import { store } from "@/store";
import "./App.scss";

const Home = loadable(() => import("@/components/pages/Home"));

/** The root component. */
export const App: React.ReactElement = (
    <ReduxProvider store={store}>
        <ReactRouter.BrowserRouter>
            <ReactRouter.Switch>
                <ReactRouter.Route exact path="/" children={<Home />} />
            </ReactRouter.Switch>
        </ReactRouter.BrowserRouter>
    </ReduxProvider>
);

export default App;
