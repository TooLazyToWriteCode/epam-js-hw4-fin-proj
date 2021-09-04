import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "@/components/App";
import { store } from "@/store";

/** The base element for providers, etc. */
export const Base: React.ReactElement = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

export default Base;
