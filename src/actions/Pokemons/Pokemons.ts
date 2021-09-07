import { Pokemon } from "@/config/Pokemons/Pokemons.types";
import { AppDispatch } from "@/config/Store/Store.types";
import {
    getCaughtPokemons as getCaughtAPI,
    getPokemons as getPokemonsAPI,
} from "@/utilities/HTTP";

import { PokemonsAction, PokemonsThunkAction } from "./Pokemons.types";

export const addPokemons = (list: Pokemon[]): PokemonsAction => {
    const type = "ADD_POKEMONS";

    return { type, list };
};

export const loadNextPokemons = (): PokemonsAction => {
    const type = "LOAD_NEXT_POKEMONS";

    return { type };
};

export const resetPokemons = (): PokemonsAction => {
    const type = "RESET_POKEMONS";

    return { type };
};

export const setLoadingPokemonPage = (): PokemonsAction => {
    const type = "SET_LOADING_POKEMON_PAGE";

    return { type };
};

export const getPokemons = (page: number): PokemonsThunkAction => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoadingPokemonPage());

        const response = await getPokemonsAPI(page);

        // TODO: What if a request fails?
        dispatch(addPokemons(response.data));
    };
};

export const getCaughtPokemons = (page: number): PokemonsThunkAction => {
    return async (dispatch: AppDispatch) => {
        dispatch(setLoadingPokemonPage());

        const response = await getCaughtAPI(page);

        // TODO: What if a request fails?
        dispatch(addPokemons(response.data));
    };
};
