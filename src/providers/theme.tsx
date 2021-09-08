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
    element: React.ReactNode
): React.ReactNode => {
    return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
};
