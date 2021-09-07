import { PokemonsThunkAction } from "@/actions/Pokemons/Pokemons.types";

export interface Props {
    getCallback: (page: number) => PokemonsThunkAction;
    showButtons: boolean;
}
