import { DoneAll, Home } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { Paper, StylesProvider, Tab, Tabs, Toolbar } from "@material-ui/core";
import { useEffect, useState } from "react";

import pages from "@/pages";
import styles from "./Header.scss";

type Index = number | false;

interface LocationState {
    pathname: string;
}

const getPathIndex = (location: LocationState): Index => {
    switch (location.pathname.replace(/(?!^)\/$/, "")) {
        case pages.home.path:
            return 0;
        case pages.caught.path:
            return 1;
        default:
            return false;
    }
};

/** The header at the top of the page. */
export const Header: React.FC<{}> = () => {
    const location = useLocation<LocationState>();
    const [index, setIndex] = useState<Index>(getPathIndex(location));

    useEffect(() => setIndex(getPathIndex(location)), [location]);

    return (
        <Paper component="header">
            <Toolbar variant="dense">
                <StylesProvider injectFirst>
                    <Tabs value={index} variant="fullWidth">
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
                </StylesProvider>
            </Toolbar>
        </Paper>
    );
};

export default Header;
