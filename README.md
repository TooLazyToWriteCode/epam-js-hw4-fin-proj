# Poke Catch

|               Task               |  Deadline  |
| :------------------------------: | :--------: |
| Create the `pokedex` application | 09.09.2021 |

## Requirements

### Packages

-   [x] `json-server`
-   [x] `react`
-   [x] `react-dom`
-   [x] `react-router-dom`
-   [x] `redux`
-   [x] `webpack`

### Basic

-   [ ] **Pagination** Is one of:
    -   [ ] **A "Load More" button** loads the next section in the common list.
    -   [ ] **Endless scroll** loads the next section as a page end is reached.
    -   [ ] **Numbered pages (traditional)** have only one section per a page.
-   [ ] **Adaptive Design**
-   [ ] **Navigation Menu**
-   [ ] **Redux for the state management**

### Pages

-   [ ] **The home page** contains tiles with diferent pokemons. Each tile
        should have a picture of a pokemon, its name and a "Catch" button. If
        a pokemon is already caught, then a button should be disabled. When a
        pokemon is clicked, a user should be redirected to a pokemon page.
-   [ ] **A pokemon page** contains information for a given pokemon, such as an
        ID, a name, a picture, whether it is caught. If a pokemon is caught, a
        date when a pokemon was caught should be shown.
-   [ ] **The caught pokemons page** is same as the home page but only caught
        pokemons should be shown.

## Recommendations

-   [ ] Cover the application with the unit tests.
-   [ ] Use a CSS framework to spend less time on creating the layout.
-   [ ] Support the latest versions of the modern web browsers.
-   [ ] Try to use as much of your skills and knowledge as possible.
-   [ ] Create the accessible to as many people as possible design.
-   [ ] Put caught pokemons in a separate collection and use `json-server`
        and it to get them.
-   [ ] Make a maintainable architecture, at least separate the business
        logic from the views.

## Installation

1. Install Yarn by running `npm i -g yarn`.
2. Install the dependencies by running `yarn install`.
3. (optional) Install the recommendations in VSCode.
