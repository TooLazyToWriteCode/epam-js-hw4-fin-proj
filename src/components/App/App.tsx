import { Provider } from "react-redux";

import { store } from "@/store";
import Router from "@/components/Router";
import "./App.scss";

/** The root component. */
export const App: React.ReactElement = (
    <Provider store={store}>
        <Router />
    </Provider>
);

export default App;
