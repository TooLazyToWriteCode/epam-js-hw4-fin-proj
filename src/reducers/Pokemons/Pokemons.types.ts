import { Reducer } from "redux";

import { PokemonsAction } from "@/actions/Pokemons/Pokemons.types";
import { PokemonsState } from "@/states/Pokemons/Pokemons.types";

export type PokemonsReducer = Reducer<PokemonsState, PokemonsAction>;
