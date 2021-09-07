import { Button, CircularProgress } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadNextPokemons } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { PokeCard } from "@/components/parts/PokeCard";
import { Location } from "@/config/Location/Location.types";
import { useBigButton } from "@/stylesheets/BigButton";

import { useStyles } from "./PokeScroll.styles";
import { Props } from "./PokeScroll.types";

export const PokeScroll: React.FC<Props> = (props) => {
    // The infinite scroll is done with the help of the following tutorial,
    // refer to it and the `IntersectionObserver` docs for more information:
    // https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f.

    const handleObserver: IntersectionObserverCallback = (entries) => {
        if (entries[0].isIntersecting) {
            dispatch(loadNextPokemons());
        }
    };

    const pokemons = useAppSelector((state) => state.pokemons);

    const bigButton = useBigButton();
    const button = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation<Location>();
    const observer = new IntersectionObserver(handleObserver);
    const styles = useStyles();

    useEffect(() => {
        dispatch(props.getCallback(pokemons.page));
    }, [pokemons.page, location]);

    useEffect(() => {
        if (button.current !== null) {
            observer.disconnect();
            observer.observe(button.current);
        }
    }, [button]);

    return (
        <>
            {Object.values(pokemons.list).map((pokemon) => (
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
                disabled={
                    !pokemons.hasOnceRequested ||
                    pokemons.hasReachedEnd ||
                    pokemons.isLoadingPage
                }
                onClick={() => dispatch(loadNextPokemons())}
                ref={button}
                variant="contained"
            >
                {pokemons.isLoadingPage ? (
                    <CircularProgress
                        className={styles.buttonProgress}
                        size={25}
                    />
                ) : pokemons.hasReachedEnd ? (
                    "You have loaded them all!"
                ) : (
                    "Load More..."
                )}
            </Button>
        </>
    );
};
