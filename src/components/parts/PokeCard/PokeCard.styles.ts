import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
    },
    image: {
        height: theme.spacing(16),
        flex: "0 0 auto",
        imageRendering: "-webkit-optimize-contrast",
        width: theme.spacing(16),
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
