import { PokemonsState } from "./Pokemons.types";

export const initial: PokemonsState = {
    hasOnceRequested: false,
    hasReachedEnd: false,
    list: [],
    page: 1,
};
