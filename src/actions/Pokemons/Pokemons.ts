import { Pokemon, PokemonsList } from "@/config/Pokemons/Pokemons.types";
import { AppDispatch } from "@/config/Store/Store.types";
import {
    getCaughtPokemons as getCaughtAPI,
    getPokemons as getPokemonsAPI,
    putPokemon as putPokemonAPI,
} from "@/utilities/HTTP";

import { PokemonsAction, PokemonsThunkAction } from "./Pokemons.types";

export const addPokemons = (list: Pokemon[]): PokemonsAction => {
    const type = "ADD_POKEMONS";

    const listWithIDs = list.reduce((previous, current) => {
        return { ...previous, [current.id]: current };
    }, {} as PokemonsList);

    return { type, list: listWithIDs };
};

export const changePokemon = (pokemon: Pokemon): PokemonsAction => {
    const type = "CHANGE_POKEMON";

    return { type, pokemon };
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

export const putPokemon = (pokemon: Pokemon): PokemonsThunkAction => {
    return async (dispatch: AppDispatch) => {
        await putPokemonAPI(pokemon);

        // TODO: What if a request fails?
        dispatch(changePokemon(pokemon));
    };
};
