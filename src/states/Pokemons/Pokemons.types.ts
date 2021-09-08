import { Pokemon, PokemonsList } from "@/config/Pokemons/Pokemons.types";

export interface PokemonsState {
    hasErrorOccured: boolean;
    hasOnceRequested: boolean;
    hasReachedEnd: boolean;
    isLoadingPage: boolean;
    list: PokemonsList;
    page: number;
    pokemon?: Pokemon;
}
