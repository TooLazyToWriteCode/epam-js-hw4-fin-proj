import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@/store";
import App from "@/components/App";

/** The base element for providers, etc. */
export const Base: React.ReactElement = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Base;
