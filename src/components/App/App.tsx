import { Provider } from "react-redux";

import { store } from "@/store";
import Router from "@/components/Router";
import styles from "./App.scss";

/** The root component. */
export const App: React.ReactElement = (
    <Provider store={store}>
        <div className={styles.wrap}>
            <Router />
        </div>
    </Provider>
);

export default App;
