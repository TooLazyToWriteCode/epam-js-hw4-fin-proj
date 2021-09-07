import { makeStyles } from "@material-ui/core/styles";

import { squareSize } from "@/stylesheets/SquareSize";

export const useStyles = makeStyles((theme) => ({
    button: {
        fontWeight: 700,
        textTransform: "capitalize",
        width: "100%",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    image: {
        ...squareSize(theme.spacing(16)),
        flex: "0 0 auto",
        imageRendering: "-webkit-optimize-contrast",
    },
    title: {
        paddingBottom: theme.spacing(2.5),
        textTransform: "capitalize",
    },
    wrap: {
        display: "flex",
        margin: `${theme.spacing(3)}px 0`,
    },
}));
