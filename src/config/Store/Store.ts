import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { rootReducer } from "@/reducers/Root";
import { isDev } from "@/utilities/Env";

const devToolsName = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";
const devTools = typeof window !== undefined && (window as any)[devToolsName];

const enchancer = isDev ? devTools || compose : compose;
const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(rootReducer, enchancer(middleware));
