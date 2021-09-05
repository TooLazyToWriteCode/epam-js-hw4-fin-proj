import { CircularProgress, Container, StylesProvider } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";

import PokeCard from "@/components/parts/PokeCard";
import { Pokemon, queryPokemons } from "@/utilities/queries";

import styles from "./Home.scss";

/** The home page. */
export const Home: React.FC<{}> = () => {
    /**
     * The infinite scroll is done with the help of the following tutorial,
     * refer to it and the `IntersectionObserver` docs for more information:
     * @see https://dev.to/hunterjsbit/react-infinite-scroll-in-few-lines-588f
     */

    const [cards, setCards] = useState<Pokemon[]>([]);
    const [page, setPage] = useState<number>(0);
    const progress = useRef(null);

    const handleObserver: IntersectionObserverCallback = (entities) => {
        if (entities[0].isIntersecting) {
            setPage((page) => page + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
        });

        if (progress.current !== null) {
            observer.observe(progress.current);
        }
    }, []);

    useEffect(() => {
        queryPokemons(page).then((request) => {
            setCards(cards.concat(request.data));
        });
    }, [page]);

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
