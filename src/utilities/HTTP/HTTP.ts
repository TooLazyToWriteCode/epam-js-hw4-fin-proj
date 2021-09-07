import axios from "axios";

import { Pokemon } from "@/types/pokemons";

import { PokemonsResponse, UndefinedResponse } from "./HTTP.types";

// webpack ensures that `process.env.*` are set, so
// we can safely ignore the undefined case in them.

const serverURL = process.env.SERVER_URL!;

/** @see https://github.com/axios/axios */
const http = axios.create({ baseURL: serverURL });

export const getCaughtPokemons = async (page: number): PokemonsResponse => {
    const url = process.env.SERVER_GET_CAUGHT_POKEMONS!;

    return http.get(url.replaceAll(":page", page.toString()));
};

export const getPokemonImageSrc = (id: string): string => {
    const url = process.env.SERVER_GET_POKEMON_IMAGE!;

    return new URL(url.replaceAll(":id", id), serverURL).toString();
};

export const getPokemons = async (page: number): PokemonsResponse => {
    const url = process.env.SERVER_GET_POKEMONS!;

    return http.get(url.replaceAll(":page", page.toString()));
};

export const putPokemons = async (pokemon: Pokemon): UndefinedResponse => {
    const url = process.env.SERVER_PUT_POKEMON!.replaceAll(":id", pokemon.id);

    return http.put(url, pokemon);
};
