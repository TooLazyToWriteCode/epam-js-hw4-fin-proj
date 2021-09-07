import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

import { RootState } from "@/states/Root/Root.types";

import { store } from "./Store";

export type AppDispatch = typeof store.dispatch &
    ThunkDispatch<RootState, unknown, AnyAction>;
