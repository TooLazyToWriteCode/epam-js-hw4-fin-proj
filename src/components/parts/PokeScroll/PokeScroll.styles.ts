import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    button: {
        margin: `${theme.spacing(3)}px auto`,
    },
    buttonProgress: {
        color: theme.palette.primary.contrastText,
    },
}));
