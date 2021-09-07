import loadable from "@loadable/component";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";

import { Header } from "@/components/sections/Header";
import { pages } from "@/config/Pages";

import { useStyles } from "./App.styles";

const Caught = loadable(() => import("@/components/pages/Caught"));
const Error404 = loadable(() => import("@/components/pages/Error404"));
const Home = loadable(() => import("@/components/pages/Home"));
const Pokemon = loadable(() => import("@/components/pages/Pokemon"));

export const App: React.FC<{}> = () => {
    const styles = useStyles();

    return (
        <div className={styles.wrap}>
            <Header />
            <Container maxWidth="sm">
                <Switch>
                    <Route path={pages.caught.path} children={<Caught />} />
                    <Route path={pages.home.path} children={<Home />} exact />
                    <Route path={pages.pokemon.path} children={<Pokemon />} />
                    <Route path={pages.error404.path} children={<Error404 />} />
                </Switch>
            </Container>
        </div>
    );
};
