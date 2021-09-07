import { makeStyles } from "@material-ui/core/styles";

const appleFonts = "apple-system, BlinkMacSystemFont";
const linuxFonts = "'Droid Sans', 'Noto Sans'";
const windowsFonts = "'Segoe UI', Arial, Helvetica";
const defaultFonts = `${appleFonts}, ${linuxFonts}, ${windowsFonts}`;

export const useStyles = makeStyles({
    wrap: {
        fontFamily: `Roboto, ${defaultFonts}, system-ui, sans-serif`,
    },
});
