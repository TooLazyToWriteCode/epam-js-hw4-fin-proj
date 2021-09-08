import { Pokemon, PokemonsList } from "@/config/Pokemons/Pokemons.types";
import { AppDispatch } from "@/config/Store/Store.types";
import {
    getCaughtPokemons as getCaughtAPI,
    getPokemon as getPokemonAPI,
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

export const errorOccured = (): PokemonsAction => {
    const type = "ERROR_OCCURED";

    return { type };
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

export const setPokemon = (pokemon: Pokemon): PokemonsAction => {
    const type = "SET_POKEMON";

    return { type, pokemon };
};

export const getPokemon = (id: string): PokemonsThunkAction => {
    return (dispatch: AppDispatch) => {
        getPokemonAPI(id)
            .then((response) => dispatch(setPokemon(response.data)))
            .catch(() => dispatch(errorOccured()));
    };
};

export const getPokemons = (page: number): PokemonsThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch(setLoadingPokemonPage());
        getPokemonsAPI(page)
            .then((response) => dispatch(addPokemons(response.data)))
            .catch(() => dispatch(errorOccured()));
    };
};

export const getCaughtPokemons = (page: number): PokemonsThunkAction => {
    return (dispatch: AppDispatch) => {
        dispatch(setLoadingPokemonPage());
        getCaughtAPI(page)
            .then((response) => dispatch(addPokemons(response.data)))
            .catch(() => dispatch(errorOccured()));
    };
};

export const putPokemon = (pokemon: Pokemon): PokemonsThunkAction => {
    return (dispatch: AppDispatch) => {
        putPokemonAPI(pokemon)
            .then(() => dispatch(changePokemon(pokemon)))
            .catch(() => dispatch(errorOccured()));
    };
};
