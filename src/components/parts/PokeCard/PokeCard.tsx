import {
    Button,
    Card,
    CardContent,
    CardMedia,
    StylesProvider,
    Typography,
} from "@material-ui/core";

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
    // webpack ensures that these are set, so we
    // can safely ignore the undefined case here.
    const imageURL = new URL(
        process.env.SERVER_POKEMON_IMAGE_QUERY!.replace(":id", props.id),
        process.env.SERVER_URL!
    );

    return (
        <StylesProvider injectFirst>
            <Card className={styles.card}>
                <CardMedia
                    className={styles.image}
                    image={imageURL.toString()}
                    title={props.name}
                />
                <CardContent className={styles.content}>
                    <Typography
                        className={styles.name}
                        component="h5"
                        variant="h5"
                    >
                        {props.name}
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
