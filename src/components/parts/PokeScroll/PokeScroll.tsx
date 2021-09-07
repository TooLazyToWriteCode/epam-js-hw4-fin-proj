import { Button } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { checkIntersection, loadNextPokemons } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { PokeCard } from "@/components/parts/PokeCard";
import { useBigButton } from "@/stylesheets/BigButton";

import { Props } from "./PokeScroll.types";
import { useStyles } from "./PokeScroll.styles";

export const PokeScroll: React.FC<Props> = (props) => {
    // The infinite scroll is done with the help of the following tutorial,
    // refer to it and the `IntersectionObserver` docs for more information:
    // https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f.

    const pokemons = useAppSelector((state) => state.pokemons);

    const bigButton = useBigButton();
    const button = useRef(null);
    const dispatch = useDispatch();
    const styles = useStyles();

    const observer = new IntersectionObserver((entries) => {
        dispatch(checkIntersection(entries[0].isIntersecting));
    });

    useEffect(() => {
        dispatch(props.getCallback(pokemons.page));
    }, [pokemons.page]);

    useEffect(() => {
        if (button.current !== null) {
            observer.disconnect();
            observer.observe(button.current);
        }
    }, [button]);

    return (
        <>
            {pokemons.list.map((pokemon) => (
                <PokeCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    showButton={props.showButtons}
                />
            ))}
            <Button
                className={`
                    ${styles.button}
                    ${bigButton.bigButton}
                `}
                color="primary"
                disabled={pokemons.hasReachedEnd}
                onClick={() => dispatch(loadNextPokemons())}
                ref={button}
                variant="contained"
            >
                {pokemons.hasReachedEnd
                    ? "You have loaded them all!"
                    : "Load More..."}
            </Button>
        </>
    );
};
