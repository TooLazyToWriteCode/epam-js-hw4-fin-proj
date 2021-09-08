import { Pages } from "./Pages.types";

export const pages: Pages = {
    caught: {
        name: "Caught Pokemons",
        path: "/caught",
    },
    error: {
        name: "Error",
        path: "/error",
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
        name: "Pokemon :name", // :name will be replaced with the pokemon name.
        path: "/pokemon/:id",
    },
};
