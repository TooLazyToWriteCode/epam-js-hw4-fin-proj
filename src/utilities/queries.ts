import { AxiosResponse } from "axios";

import axios from "@/axios";

export interface Pokemon {
    id: string;
    name: string;
}

/** The response type of our server. */
export type Response = Promise<AxiosResponse<Pokemon>>;

/** Queries a page of pokemons. */
export const queryPokemons = async (page: number): Response => {
    const query = process.env.SERVER_POKEMONS_QUERY!;
    return axios.get(query.replaceAll(":page", page.toString()));
};

export const getCaughtPokemons = async (page: number): Response => {
    const query = process.env.SERVER_GET_POKEMON_CATCH!;
    return axios.get(query.replaceAll(":page", page.toString()));
};

export const postPokemons = async (id: string, name: string): Response => {
    const query = process.env.SERVER_POST_POKEMON_CATCH!.replaceAll(":id", id);
    return axios.put(query, { name, caught: true });
};
