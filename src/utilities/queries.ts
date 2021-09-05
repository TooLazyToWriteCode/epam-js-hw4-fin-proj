import { AxiosResponse } from "axios";

import axios from "@/axios";

export interface Pokemon {
    id: string;
    name: string;
}

/** The response type of our server. */
export type Response = Promise<AxiosResponse<Pokemon>>;

/** Queries a page of pokemons. */
export const queryPokemons = async (pageNum: number): Response => {
    const page = pageNum.toString();
    const query = process.env.SERVER_POKEMONS_QUERY!.replaceAll(":page", page);

    return axios.get(query);
};
