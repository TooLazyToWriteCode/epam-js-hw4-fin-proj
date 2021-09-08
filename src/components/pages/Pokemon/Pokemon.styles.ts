import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    loading: {
        display: "block",
        margin: `${theme.spacing(3)}px auto`,
    },
}));
