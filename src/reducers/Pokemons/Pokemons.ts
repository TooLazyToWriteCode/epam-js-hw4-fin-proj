import { initial } from "@/states/Pokemons";

import { PokemonsReducer } from "./Pokemons.types";

export const pokemonsReducer: PokemonsReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_POKEMONS":
            const list = action.list || [];

            return {
                ...state,
                hasOnceRequested: true,
                hasReachedEnd: list.length === 0,
                list: state.list.concat(list),
            };
        case "LOAD_NEXT_POKEMONS":
            return {
                ...state,
                page: state.page + 1,
            };
        case "RESET_POKEMONS":
            return { ...state, ...initial };
        default:
            return state;
    }
};
