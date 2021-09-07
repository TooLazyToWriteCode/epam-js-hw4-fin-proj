import { AppBar, Tab, Tabs, Toolbar } from "@material-ui/core";
import { DoneAll, Home } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { changePageTab } from "@/actions/PageTabs";
import { resetPokemons } from "@/actions/Pokemons";
import { useAppSelector } from "@/components/hooks/useAppSelector";
import { Location } from "@/config/Location/Location.types";
import { pages } from "@/config/Pages";

import { useStyles } from "./Header.styles";

export const Header: React.FC<{}> = () => {
    const pageTabs = useAppSelector((state) => state.pageTabs);

    const dispatch = useDispatch();
    const location = useLocation<Location>();
    const styles = useStyles();

    useEffect(() => {
        dispatch(resetPokemons());
        dispatch(changePageTab(location));
    }, [location]);

    return (
        <>
            <AppBar component="header">
                <Toolbar>
                    <Tabs
                        aria-label="Header Page Navigation"
                        value={pageTabs.tab}
                    >
                        <Tab
                            classes={{ root: styles.tab }}
                            component={Link}
                            icon={<Home />}
                            label={pages.home.name}
                            to={pages.home.path}
                        />
                        <Tab
                            classes={{ root: styles.tab }}
                            component={Link}
                            icon={<DoneAll />}
                            label={pages.caught.name}
                            to={pages.caught.path}
                        />
                    </Tabs>
                </Toolbar>
            </AppBar>
            <div className={styles.space}></div>
        </>
    );
};
