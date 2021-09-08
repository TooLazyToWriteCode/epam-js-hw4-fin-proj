import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Link,
    Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { putPokemon } from "@/actions/Pokemons";
import { pages } from "@/config/Pages";
import { useBigButton } from "@/stylesheets/BigButton";
import { useBlock } from "@/stylesheets/Block";
import { getPokemonImageSource } from "@/utilities/HTTP";
import { replaceID } from "@/utilities/Replace";

import { useStyles } from "./PokeCard.styles";
import { Props } from "./PokeCard.types";

export const PokeCard: React.FC<Props> = (props) => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const bigButton = useBigButton();
    const block = useBlock();

    const isCaught = typeof props.pokemon.caught !== "undefined";
    const realPath = replaceID(pages.pokemon.path, props.pokemon.id);

    const catchPokemon = (): void => {
        const pokemon = Object.assign({}, props.pokemon);

        pokemon.caught = new Date();
        dispatch(putPokemon(pokemon));
    };

    return (
        <Card className={`${styles.wrap} ${block.centered}`}>
            <CardMedia
                aria-label={props.pokemon.name}
                className={styles.image}
                component={props.profile ? "div" : RouterLink}
                image={getPokemonImageSource(props.pokemon.id)}
                title={props.pokemon.name}
                to={realPath}
            />
            <CardContent className={styles.content}>
                <Typography
                    className={`${styles.title} ${
                        props.profile ? styles.profileTitle : ""
                    }`}
                    component="h5"
                    variant="h5"
                >
                    {props.profile ? (
                        <>
                            {props.pokemon.name}
                            <Typography
                                component="span"
                                variant="h5"
                                color="textSecondary"
                            >
                                {` #${props.pokemon.id}`}
                            </Typography>
                        </>
                    ) : (
                        <Link component={RouterLink} to={realPath}>
                            {props.pokemon.name}
                        </Link>
                    )}
                </Typography>
                {props.profile && (
                    <>
                        <Typography color="textSecondary">
                            {props.pokemon.caught ? (
                                <>
                                    {`Caught on: ${new Intl.DateTimeFormat(
                                        undefined,
                                        {
                                            dateStyle: "short",
                                            timeStyle: "short",
                                        }
                                    ).format(new Date(props.pokemon.caught))}`}
                                </>
                            ) : (
                                <>Never caught</>
                            )}
                        </Typography>
                    </>
                )}
                {!props.profile && props.showButton && (
                    <Button
                        className={bigButton.bigButton}
                        color="primary"
                        onClick={catchPokemon}
                        variant="contained"
                        disabled={isCaught}
                    >
                        {isCaught ? "already caught" : "catch!"}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};
