import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPokemon } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { PokeCard } from "@/components/parts/PokeCard";
import { Error } from "@/components/sections/Error";
import { useBlock } from "@/stylesheets/Block";

import { useStyles } from "./Pokemon.styles";
import { URLParams } from "./Pokemon.types";

export const Pokemon: React.FC<{}> = () => {
    const pokemons = useAppSelector((state) => state.pokemons);

    const { id } = useParams<URLParams>();
    const dispatch = useDispatch();
    const block = useBlock();
    const styles = useStyles();

    useEffect(() => {
        dispatch(getPokemon(id));
    }, []);

    return pokemons.hasErrorOccured ? (
        <Error />
    ) : pokemons.pokemon === undefined ? (
        <CircularProgress className={`${styles.progress} ${block.centered}`} />
    ) : (
        <PokeCard pokemon={pokemons.pokemon} profile={true} />
    );
};
