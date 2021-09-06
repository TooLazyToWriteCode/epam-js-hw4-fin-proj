import { CircularProgress, Container, StylesProvider } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { catchPokemon } from "@/actions/catcher";
import PokeCard from "@/components/parts/PokeCard";
import { CatcherState } from "@/reducers/catcher";
import { AppDispatch, useAppSelector } from "@/store";
import { Pokemon, getCaughtPokemons } from "@/utilities/queries";

import styles from "./Caught.scss";

/** The caught pokemons page. */
export const Caught: React.FC<{}> = () => {
    /**
     * The infinite scroll is done with the help of the following tutorial,
     * refer to it and the `IntersectionObserver` docs for more information:
     * @see https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
     */

    const [cards, setCards] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(1);
    const neverReq = useRef(true);
    const [endReach, setEndReach] = useState<boolean>(false);
    const progress = useRef<HTMLElement | null>(null);
    const leftCount = useRef(-1);

    const observer = new IntersectionObserver((entities) => {
        if (!neverReq.current && entities[0].isIntersecting) {
            setPage((page) => page + 1);
        }
    });

    useEffect(() => {
        (async () => {
            let pokemonsResponse: any = await getCaughtPokemons(page);
            neverReq.current = false;

            if (leftCount.current === -1) {
                leftCount.current = Number(
                    pokemonsResponse.headers["X-Total-Count".toLowerCase()]
                );
            }

            setCards((cards) => cards.concat(pokemonsResponse.data));

            leftCount.current -= pokemonsResponse.data.length;

            if (leftCount.current <= 0) {
                setEndReach(true);
                return;
            }
        })();
    }, [page]);

    useEffect(() => {
        if (progress.current !== null) {
            observer.observe(progress.current);
        }
    }, [progress]);

    return (
        <Container maxWidth="sm">
            {cards.map((card) => (
                <PokeCard id={card.id} key={card.id} name={card.name} />
            ))}
            {!endReach && (
                <StylesProvider injectFirst>
                    <CircularProgress
                        className={styles.progress}
                        ref={progress}
                    />
                </StylesProvider>
            )}
        </Container>
    );
};

export default Caught;
