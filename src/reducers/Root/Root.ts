import { combineReducers } from "redux";

import { pageTabsReducer } from "@/reducers/PageTabs";
import { pokemonsReducer } from "@/reducers/Pokemons";

export const rootReducer = combineReducers({
    pageTabs: pageTabsReducer,
    pokemons: pokemonsReducer,
});
