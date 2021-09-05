import { combineReducers, createStore } from "redux";

/** The root reducer. */
export const reducer = combineReducers({});

/** The application store itself. */
export const store = createStore(reducer);

/** The application store dispatch type. */
export type AppDispatch = typeof store.dispatch;

/** The application store root state type. */
export type RootState = ReturnType<typeof store.getState>;
