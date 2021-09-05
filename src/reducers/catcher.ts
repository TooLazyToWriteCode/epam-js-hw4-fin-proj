import { Reducer } from "redux";

import { CatcherAction } from "@/actions/catcher";

export interface CaughtPokemons {
    [id: string]: Date;
}

export interface CatcherState {
    caught: CaughtPokemons;
}

const defaultState: CatcherState = {
    caught: {},
};

export const catcherReducer: Reducer<CatcherState, CatcherAction> = (
    state = defaultState,
    action
) => {
    switch (action.type) {
        case "CATCH_POKEMON":
            return {
                ...state,
                caught: Object.assign(state.caught, {
                    [action.id]: new Date(),
                }),
            };
        default:
            return state;
    }
};

export default catcherReducer;
