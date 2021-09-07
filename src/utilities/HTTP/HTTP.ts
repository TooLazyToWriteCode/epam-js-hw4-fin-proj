import axios from "axios";

import { Pokemon } from "@/types/pokemons";

import { PokemonsResponse, UndefinedResponse } from "./HTTP.types";

/** @see https://github.com/axios/axios */
const http = axios.create({ baseURL: process.env.SERVER_URL });

export const getCaughtPokemons = async (page: number): PokemonsResponse => {
    const url = process.env.SERVER_GET_CAUGHT_POKEMONS!;

    return http.get(url.replaceAll(":page", page.toString()));
};

export const getPokemons = async (page: number): PokemonsResponse => {
    const url = process.env.SERVER_GET_POKEMONS!;

    return http.get(url.replaceAll(":page", page.toString()));
};

export const putPokemons = async (pokemon: Pokemon): UndefinedResponse => {
    const url = process.env.SERVER_PUT_POKEMON!.replaceAll(":id", pokemon.id);

    return http.put(url, pokemon);
};
