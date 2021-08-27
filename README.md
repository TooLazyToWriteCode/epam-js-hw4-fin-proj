# The final project

|  Deadline  |               Task               |
| :--------: | :------------------------------: |
| 09.09.2021 | Create the `pokedex` application |

## Requirements

### Packages

-   [ ] `json-server`
-   [ ] `react`
-   [ ] `react-dom`
-   [ ] `react-router-dom`
-   [ ] `redux`
-   [ ] `webpack`

### Basic

-   [ ] **Pagination** Is one of:
    -   [ ] **A "Load More" button** loads the next section in the common list.
    -   [ ] **Endless scroll** loads the next section as a page end is reached.
    -   [ ] **Numbered pages (traditional)** have only one section per a page.
-   [ ] **Adaptive Design**
-   [ ] **Navigation Menu**
-   [ ] **Redux for the state management**

### Pages

-   [ ] **The main page** contains tiles with diferent pokemons. Each tile
        should have a picture of a pokemon, its name and a "Catch" button. If
        a pokemon is already caught, then a button should be disabled. When a
        pokemon is clicked, a user should be redirected to a pokemon page.
-   [ ] **A pokemon page** contains information for a given pokemon, such as an
        ID, a name, a picture, whether it is caught. If a pokemon is caught, a
        date when a pokemon was caught should be shown.
-   [ ] **The caught pokemons page** is same as the main page but only caught
        pokemons should be shown.

## Recommendations

-   [ ] Cover the application with the unit tests.
-   [ ] Use a CSS framework to spend less time on creating the layout.
-   [ ] Support the latest versions of the modern web browsers.
-   [ ] Try to use as much of your skills and knowledge as possible.
-   [ ] Create the accessible to as many people as possible design.
-   [ ] Caught pokemons should be put in a separate collection and then
        connected via the `json-server` features.
-   [ ] Make a maintainable architecture, at least separate the business
        logic from the views.
