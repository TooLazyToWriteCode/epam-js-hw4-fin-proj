import { Action } from "redux";

export type CatcherAction = Action & {
    id: string;
};

export const catchPokemon = (id: string): CatcherAction => {
    return { id, type: "CATCH_POKEMON" };
};
