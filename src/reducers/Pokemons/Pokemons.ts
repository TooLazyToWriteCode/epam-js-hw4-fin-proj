import { initial } from "@/states/Pokemons";

import { PokemonsReducer } from "./Pokemons.types";

export const pokemonsReducer: PokemonsReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_POKEMONS":
            return { ...state, list: action.list || [] };
        case "RESET_POKEMONS":
            return { ...state, list: [] };
        default:
            return state;
    }
};
