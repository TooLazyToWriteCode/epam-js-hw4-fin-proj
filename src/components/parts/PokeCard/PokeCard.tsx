import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Link,
    StylesProvider,
    Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import pages from "@/pages";

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
    const pathReplaced = pages.pokemon.path.replaceAll(":id", props.id);

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
                    >
                        Catch!
                    </Button>
                </CardContent>
            </Card>
        </StylesProvider>
    );
};

export default PokeCard;
