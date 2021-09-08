import { makeStyles } from "@material-ui/core/";

export const useButton = makeStyles((theme) => ({
    big: {
        fontWeight: 700,
        textTransform: "capitalize",
        width: "100%",
    },
    progressDisabled: {
        color: theme.palette.action.disabled,
    },
}));
