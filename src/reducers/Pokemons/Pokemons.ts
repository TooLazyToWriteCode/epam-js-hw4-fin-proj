import { initial } from "@/states/Pokemons";

import { PokemonsReducer } from "./Pokemons.types";

export const pokemonsReducer: PokemonsReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_POKEMONS":
            return {
                ...state,
                list: state.list.concat(action.list || []),
                page: state.page + 1,
            };
        case "RESET_POKEMONS":
            return { ...state, ...initial };
        default:
            return state;
    }
};
