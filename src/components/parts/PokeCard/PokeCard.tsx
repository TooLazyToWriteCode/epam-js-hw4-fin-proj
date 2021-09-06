import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Link,
    StylesProvider,
    Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { catchPokemonWithRequest } from "@/actions/catcher";
import pages from "@/pages";
import { CatcherState } from "@/reducers/catcher";
import { AppDispatch, useAppSelector } from "@/store";

import styles from "./PokeCard.scss";

/** The information card properties. */
export interface Props {
    /** The identificatior. */
    id: string;

    /** The official name. */
    name: string;
}

/** The pokemon information card. */
export const PokeCard: React.FC<Props> = (props) => {
    const catcher: CatcherState = useAppSelector((state) => state.catcher);
    const dispatch = useDispatch<AppDispatch>();
    const pathReplaced = pages.pokemon.path.replaceAll(":id", props.id);
    const isCaught = props.id in catcher.caught;

    // webpack ensures that these are set, so we
    // can safely ignore the undefined case here.
    const imageURL = new URL(
        process.env.SERVER_POKEMON_IMAGE_QUERY!.replaceAll(":id", props.id),
        process.env.SERVER_URL!
    );

    return (
        <StylesProvider injectFirst>
            <Card className={styles.card}>
                <CardMedia
                    className={styles.image}
                    component={RouterLink}
                    image={imageURL.toString()}
                    title={props.name}
                    to={pathReplaced}
                />
                <CardContent className={styles.content}>
                    <Typography
                        className={styles.name}
                        component="h5"
                        variant="h5"
                    >
                        <Link
                            className={styles.link}
                            component={RouterLink}
                            to={pathReplaced}
                        >
                            {props.name}
                        </Link>
                    </Typography>
                    <Button
                        className={styles.button}
                        color="primary"
                        variant="contained"
                        onClick={() =>
                            dispatch(catchPokemonWithRequest(props.id))
                        }
                        disabled={isCaught}
                    >
                        {(isCaught && "already caught") || "catch!"}
                    </Button>
                </CardContent>
            </Card>
        </StylesProvider>
    );
};

export default PokeCard;
