import { DoneAll, Home } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { Paper, StylesProvider, Tab, Tabs, Toolbar } from "@material-ui/core";
import { useEffect, useState } from "react";

import pages from "@/pages";
import styles from "./Header.scss";

type PageIndex = number | false;

interface LocationState {
    pathname: string;
}

const getPageIndex = (location: LocationState): PageIndex => {
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

    const [pageIndex, setPageIndex] = useState<PageIndex>(
        getPageIndex(location)
    );

    useEffect(() => setPageIndex(getPageIndex(location)), [location]);

    return (
        <StylesProvider injectFirst>
            <Paper component="header">
                <Toolbar variant="dense">
                    <Tabs value={pageIndex} variant="fullWidth">
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
            </Paper>
        </StylesProvider>
    );
};

export default Header;
