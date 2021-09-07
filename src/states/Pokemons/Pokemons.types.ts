import { Pokemon } from "@/config/Pokemons/Pokemons.types";

export interface PokemonsState {
    hasOnceRequested: boolean;
    hasReachedEnd: boolean;
    isLoadingPage: boolean;
    list: Pokemon[];
    page: number;
}
