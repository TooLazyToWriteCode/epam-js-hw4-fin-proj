import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { AppDispatch, RootState } from "@/store";
import { postPokemons } from "@/utilities/queries";

interface Catcher {
    id: string;
}

export type CatcherAction = Action<string> & Catcher;

export const catchPokemon = (id: string): CatcherAction => {
    return { id, type: "CATCH_POKEMON" };
};

export const catchPokemonWithRequest =
    (id: string): ThunkAction<void, RootState, unknown, CatcherAction> =>
    async (dispatch: AppDispatch) => {
        await postPokemons(id);
        dispatch(catchPokemon(id));
    };
