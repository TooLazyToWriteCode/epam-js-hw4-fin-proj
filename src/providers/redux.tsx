import { Provider } from "react-redux";

import { store } from "@/config/Store";

export const wrapIntoReduxProvider = (
    element: React.ReactNode
): React.ReactNode => {
    return <Provider store={store}>{element}</Provider>;
};
