import { Pokemon } from "@/config/Pokemons/Pokemons.types";
import { AppDispatch } from "@/config/Store/Store.types";
import {
    getCaughtPokemons as getCaughtAPI,
    getPokemons as getPokemonsAPI,
} from "@/utilities/HTTP";

import { PokemonsAction, PokemonsThunkAction } from "./Pokemons.types";

export const resetPokemons = (): PokemonsAction => {
    const type = "RESET_POKEMONS";

    return { type };
};

export const addPokemons = (list: Pokemon[]): PokemonsAction => {
    const type = "ADD_POKEMONS";

    return { type, list };
};

export const getPokemons = (page: number): PokemonsThunkAction => {
    return async (dispatch: AppDispatch) => {
        const response = await getPokemonsAPI(page);

        // TODO: What if a request fails?
        dispatch(addPokemons(response.data));
    };
};

export const getCaughtPokemons = (page: number): PokemonsThunkAction => {
    return async (dispatch: AppDispatch) => {
        const response = await getCaughtAPI(page);

        // TODO: What if a request fails?
        dispatch(addPokemons(response.data));
    };
};
