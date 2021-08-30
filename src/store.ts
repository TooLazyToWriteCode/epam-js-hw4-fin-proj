import { configureStore } from "@reduxjs/toolkit";

/** The Redux store itself. */
export const store = configureStore({
    reducer: {},
});

/** The Redux store dispatch type. */
export type Dispatch = typeof store.dispatch;

/** The Redux store root state type. */
export type RootState = ReturnType<typeof store.getState>;
