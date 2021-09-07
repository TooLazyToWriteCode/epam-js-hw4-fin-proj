import { Pokemon, PokemonsList } from "@/config/Pokemons/Pokemons.types";

export interface PokemonsState {
    hasOnceRequested: boolean;
    hasReachedEnd: boolean;
    isLoadingPage: boolean;
    list: PokemonsList;
    page: number;
}
