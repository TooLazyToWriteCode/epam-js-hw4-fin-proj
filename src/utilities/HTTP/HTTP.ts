import axios from "axios";

import { Pokemon } from "@/config/Pokemons/Pokemons.types";
import { replaceID, replacePage } from "@/utilities/Replace";

import {
    PokemonResponse,
    PokemonsResponse,
    UndefinedResponse,
} from "./HTTP.types";

// webpack ensures that `process.env.*` are set, so
// we can safely ignore the undefined case in them.

const serverURL = process.env.SERVER_URL!;

/** @see https://github.com/axios/axios */
const http = axios.create({ baseURL: serverURL });

export const getCaughtPokemons = async (page: number): PokemonsResponse => {
    const url = replacePage(process.env.SERVER_GET_CAUGHT_POKEMONS!, page);

    return http.get(url);
};

export const getPokemonImageSource = (id: string): string => {
    const url = replaceID(process.env.SERVER_GET_POKEMON_IMAGE!, id);

    return new URL(url, serverURL).toString();
};

export const getPokemon = async (id: string): PokemonResponse => {
    const url = replaceID(process.env.SERVER_GET_POKEMON!, id);

    return http.get(url);
};

export const getPokemons = async (page: number): PokemonsResponse => {
    const url = replacePage(process.env.SERVER_GET_POKEMONS!, page);

    return http.get(url);
};

export const putPokemon = async (pokemon: Pokemon): UndefinedResponse => {
    const url = replaceID(process.env.SERVER_PUT_POKEMON!, pokemon.id);

    return http.put(url, pokemon);
};
