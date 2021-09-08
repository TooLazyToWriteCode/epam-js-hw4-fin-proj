import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#234e25",
        },
        secondary: {
            main: "#dcefdf",
        },
    },
});

export const wrapIntoThemeProvider = (
    element: React.ReactElement
): React.ReactElement => {
    return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
