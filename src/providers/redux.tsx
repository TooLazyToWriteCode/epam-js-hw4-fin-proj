import { Provider } from "react-redux";

import { store } from "@/config/Store";

export const wrapIntoReduxProvider = (
    element: React.ReactElement
): React.ReactElement => {
    return <Provider store={store}>{element}</Provider>;
};
