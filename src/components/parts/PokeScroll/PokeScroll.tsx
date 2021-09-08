import { Button, CircularProgress } from "@material-ui/core";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadNextPokemons } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { PokeCard } from "@/components/parts/PokeCard";
import { Error } from "@/components/sections/Error";
import { Location } from "@/config/Location/Location.types";
import { useBlock } from "@/stylesheets/Block";
import { useButton } from "@/stylesheets/Button";

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

    const button = useButton();
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const location = useLocation<Location>();
    const block = useBlock();
    const observer = new IntersectionObserver(handleObserver);

    useEffect(() => {
        dispatch(props.getCallback(pokemons.page));
    }, [pokemons.page, location]);

    useEffect(() => {
        if (buttonRef.current !== null) {
            observer.disconnect();
            observer.observe(buttonRef.current);
        }
    }, [buttonRef]);

    return pokemons.hasErrorOccured ? (
        <Error />
    ) : (
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
                    ${block.centered}
                    ${button.big}
                `}
                color="primary"
                disabled={
                    !pokemons.hasOnceRequested ||
                    pokemons.hasReachedEnd ||
                    pokemons.isLoadingPage
                }
                onClick={() => dispatch(loadNextPokemons())}
                ref={buttonRef}
                variant="contained"
            >
                {pokemons.isLoadingPage ? (
                    <CircularProgress
                        className={button.progressDisabled}
                        size={24}
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
