import { Pokemon } from "@/config/Pokemons/Pokemons.types";

export interface PokemonsState {
    list: Pokemon[];
    page: number;
}
