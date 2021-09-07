import { PokemonsState } from "./Pokemons.types";

export const initial: PokemonsState = {
    hasOnceRequested: false,
    hasReachedEnd: false,
    isLoadingPage: true,
    list: [],
    page: 1,
};
