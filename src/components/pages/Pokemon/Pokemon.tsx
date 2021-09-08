import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import { getPokemon } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { pages } from "@/config/Pages";

import { useStyles } from "./Pokemon.styles";
import { URLParams } from "./Pokemon.types";
import { useEffect } from "react";

export const Pokemon: React.FC<{}> = () => {
    const pokemons = useAppSelector((state) => state.pokemons);

    const { id } = useParams<URLParams>();
    const dispatch = useDispatch();
    const styles = useStyles();

    useEffect(() => {
        dispatch(getPokemon(id));
    }, []);

    return pokemons.hasErrorOccured ? (
        <Redirect to={pages.error.path} />
    ) : pokemons.pokemon === undefined ? (
        <CircularProgress className={styles.loading} />
    ) : (
        <>{pokemons.pokemon.id}</>
    );
};
