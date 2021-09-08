import { PokemonsState } from "./Pokemons.types";

export const initial: PokemonsState = {
    hasErrorOccured: false,
    hasOnceRequested: false,
    hasReachedEnd: false,
    isLoadingPage: true,
    list: {},
    page: 1,
};
