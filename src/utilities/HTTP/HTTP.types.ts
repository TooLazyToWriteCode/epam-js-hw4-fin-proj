import { AxiosResponse } from "axios";

import { Pokemon } from "@/types/pokemons";

export type PokemonsResponse = Promise<AxiosResponse<Pokemon[]>>;
export type UndefinedResponse = Promise<AxiosResponse<undefined>>;
