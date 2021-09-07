import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Link,
    Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

import { pages } from "@/config/Pages";
import { useBigButton } from "@/stylesheets/BigButton";
import { getPokemonImageSrc } from "@/utilities/HTTP";
import { replaceID } from "@/utilities/Replace";

import { useStyles } from "./PokeCard.styles";
import { Props } from "./PokeCard.types";

export const PokeCard: React.FC<Props> = (props) => {
    const styles = useStyles();
    const bigButton = useBigButton();

    const isCaught = typeof props.pokemon.caught !== "undefined";
    const realPath = replaceID(pages.pokemon.path, props.pokemon.id);

    return (
        <Card className={styles.wrap}>
            <CardMedia
                className={styles.image}
                component={RouterLink}
                image={getPokemonImageSrc(props.pokemon.id)}
                title={props.pokemon.name}
                to={realPath}
            />
            <CardContent className={styles.content}>
                <Typography
                    className={styles.title}
                    component="h5"
                    variant="h5"
                >
                    <Link component={RouterLink} to={realPath}>
                        {props.pokemon.name}
                    </Link>
                </Typography>
                {props.showButton && (
                    <Button
                        className={bigButton.bigButton}
                        color="primary"
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
