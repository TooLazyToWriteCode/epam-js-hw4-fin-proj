import { initial } from "@/states/Pokemons";

import { PokemonsReducer } from "./Pokemons.types";

export const pokemonsReducer: PokemonsReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_POKEMONS":
            const actionList = action.list || {};

            if (!state.isLoadingPage) {
                return state;
            }

            return {
                ...state,
                hasReachedEnd: Object.keys(actionList).length === 0,
                isLoadingPage: false,
                list: { ...state.list, ...actionList },
            };
        case "LOAD_NEXT_POKEMONS":
            if (state.isLoadingPage) {
                return state;
            }

            if (!state.hasOnceRequested) {
                return { ...state, hasOnceRequested: true };
            }

            return { ...state, page: state.page + 1 };
        case "CHANGE_POKEMON":
            const stateListCopy = Object.assign({}, state.list);

            if (action.pokemon !== undefined) {
                stateListCopy[action.pokemon.id] = action.pokemon;
            }

            return { ...state, list: stateListCopy };
        case "RESET_POKEMONS":
            return { ...state, ...initial };
        case "SET_LOADING_POKEMON_PAGE":
            if (state.isLoadingPage) {
                return state;
            }

            return { ...state, isLoadingPage: true };
        default:
            return state;
    }
};
