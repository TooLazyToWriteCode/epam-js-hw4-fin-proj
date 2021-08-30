import { Provider as ReduxProvider } from "react-redux";
import React from "react";

import { store } from "@/store";
import "./App.scss";

/** The root component. */
export const App: React.ReactElement = (
    <ReduxProvider store={store}>
        <div>hi</div>
    </ReduxProvider>
);

export default App;
