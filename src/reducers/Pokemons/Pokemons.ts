import { initial } from "@/states/Pokemons";

import { PokemonsReducer } from "./Pokemons.types";

export const pokemonsReducer: PokemonsReducer = (state = initial, action) => {
    switch (action.type) {
        case "ADD_POKEMONS":
            const actionList = action.list || {};

            return {
                ...state,
                hasReachedEnd: Object.keys(actionList).length === 0,
                isLoadingPage: false,
                list: { ...state.list, ...actionList },
            };
        case "ERROR_OCCURED":
            return { ...state, hasErrorOccured: true };
        case "LOAD_NEXT_POKEMONS":
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
        case "SET_POKEMON":
            return { ...state, pokemon: action.pokemon };
        default:
            return state;
    }
};
