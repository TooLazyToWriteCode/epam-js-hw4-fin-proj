import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import { Pokemon } from "@/config/Pokemons/Pokemons.types";
import { RootState } from "@/states/Root/Root.types";

export interface PokemonsBaseAction {
    list?: Pokemon[];
}

export type PokemonsAction = Action<string> & PokemonsBaseAction;

export type PokemonsThunkAction = ThunkAction<
    void,
    RootState,
    unknown,
    PokemonsAction
>;
