/** The page infromation type. */
export interface Page {
    /** The name (used in titles, etc.). */
    readonly name: string;

    /** The path or the URI. */
    readonly path: string;
}

/** The pages information type. */
export interface Pages {
    /** The caught pokemons page information. */
    readonly caught: Page;

    /** The 404 Not Found error page information. */
    readonly error404: Page;

    /** The home page information. */
    readonly home: Page;

    /** The pokemon information page information. */
    readonly pokemon: Page;
}

/** The page path information. */
export const pages: Pages = {
    caught: {
        name: "Caught Pokemons",
        path: "/caught",
    },
    error404: {
        name: "Page Not Found",
        path: "*",
    },
    home: {
        name: "Home",
        path: "/",
    },
    pokemon: {
        // :name will be replaced with the pokemon name.
        name: "Pokemon :name",
        path: "/pokemon/:id",
    },
};

export default pages;
