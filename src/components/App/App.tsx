import loadable from "@loadable/component";
import { Container, ThemeProvider, createTheme } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import { Header } from "@/components/sections/Header";
import { ErrorBoundary } from "@/components/sections/ErrorBoundary";
import { pages } from "@/config/Pages";

import { useStyles } from "./App.styles";

const Caught = loadable(() => import("@/components/pages/Caught"));
const Error404 = loadable(() => import("@/components/pages/Error404"));
const Home = loadable(() => import("@/components/pages/Home"));
const Pokemon = loadable(() => import("@/components/pages/Pokemon"));

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

export const App: React.FC<{}> = () => {
    const styles = useStyles();

    return (
        <div className={styles.wrap}>
            <ThemeProvider theme={theme}>
                <Header />
                <Container maxWidth="sm">
                    <ErrorBoundary>
                        <Switch>
                            <Route
                                path={pages.caught.path}
                                component={Caught}
                            />
                            <Route
                                path={pages.home.path}
                                component={Home}
                                exact
                            />
                            <Route
                                path={pages.pokemon.path}
                                component={Pokemon}
                            />
                            <Route
                                path={pages.error404.path}
                                component={Error404}
                            />
                        </Switch>
                    </ErrorBoundary>
                </Container>
            </ThemeProvider>
        </div>
    );
};
