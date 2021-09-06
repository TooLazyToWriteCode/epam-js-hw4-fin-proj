import { CircularProgress, Container, StylesProvider } from "@material-ui/core";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { catchPokemon } from "@/actions/catcher";
import PokeCard from "@/components/parts/PokeCard";
import { AppDispatch } from "@/store";
import { Pokemon, getCaughtPokemons, queryPokemons } from "@/utilities/queries";

import styles from "./Home.scss";

/** The home page. */
export const Home: React.FC<{}> = () => {
    const dispatch = useDispatch<AppDispatch>();
    /**
     * The infinite scroll is done with the help of the following tutorial,
     * refer to it and the `IntersectionObserver` docs for more information:
     * @see https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
     */

    const [cards, setCards] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(1);
    const isNeverQueried = useRef(true);
    const progress = useRef(null);

    useEffect(() => {
        (async () => {
            let caughtPokemonsResponse: any;
            let pokemonsResponse: any;

            caughtPokemonsResponse = await getCaughtPokemons(page);
            pokemonsResponse = await queryPokemons(page);

            setCards((cards) => cards.concat(pokemonsResponse.data));

            caughtPokemonsResponse.data.forEach((pokemon: { id: string }) => {
                dispatch(catchPokemon(pokemon.id));
            });

            isNeverQueried.current = false;
        })();
    }, [page]);

    useEffect(() => {
        if (progress.current !== null) {
            new IntersectionObserver((entities) => {
                if (isNeverQueried.current) {
                    return;
                }

                if (entities[0].isIntersecting) {
                    setPage((page) => page + 1);
                }
            }).observe(progress.current);
        }
    }, [progress]);

    return (
        <Container maxWidth="sm">
            {cards.map((card) => (
                <PokeCard id={card.id} key={card.id} name={card.name} />
            ))}
            <StylesProvider injectFirst>
                <CircularProgress className={styles.progress} ref={progress} />
            </StylesProvider>
        </Container>
    );
};

export default Home;
