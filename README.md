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

-   [x] **Pagination** Is one of:
    -   [x] **A "Load More" button** loads the next section in the common list.
    -   [x] **Endless scroll** loads the next section as a page end is reached.
    -   [ ] **Numbered pages (traditional)** have only one section per a page.
-   [x] **Adaptive Design**
-   [x] **Navigation Menu**
-   [x] **Redux for the state management**

### Pages

-   [x] **The home page** contains tiles with diferent pokemons. Each tile
        should have a picture of a pokemon, its name and a "Catch" button. If
        a pokemon is already caught, then a button should be disabled. When a
        pokemon is clicked, a user should be redirected to a pokemon page.
-   [x] **A pokemon page** contains information for a given pokemon, such as an
        ID, a name, a picture, whether it is caught. If a pokemon is caught, a
        date when a pokemon was caught should be shown.
-   [x] **The caught pokemons page** is same as the home page but only caught
        pokemons should be shown.

## Recommendations

-   [ ] Cover the application with the unit tests.
-   [x] Use a CSS framework to spend less time on creating the layout.
-   [x] Support the latest versions of the modern web browsers.
-   [ ] Try to use as much of your skills and knowledge as possible.
-   [x] Create the accessible to as many people as possible design.
-   [ ] Put caught pokemons in a separate collection and use it +
        `json-server` to get them.
-   [x] Make a maintainable architecture, at least separate the business
        logic from the views.

## Installation

1. Install Yarn by running `npm i -g yarn`.
2. Install the dependencies by running `yarn install`.
3. (optional) Install the recommendations in VSCode.

## Usage

```
yarn run build:dev
```

Build the application for development. The built application can then be found
at `<rootDir>/out/build/development`.

```
yarn run build:prod
```

Build the application for production. The built application can then be found
at `<rootDir>/out/build/production`.

```
yarn run build:docs
```

Build the documentation from the source files using TypeDoc.

```
yarn run chk
```

Check the formatting of the source files using Prettier.

```
yarn run fmt
```

Format the source files using Prettier.

```
yarn run serve:db
```

Start the JSON server (backend) only.

```
yarn run serve:dev:base
```

Start the JSON server (backend) and the webpack development server. No other
utilities will be launched.

```
yarn run serve:dev:tdd
```

Same as `serve:dev:base` but also starts the Cypress unit tests utility. Useful
if the TDD approach is used.

```
yarn run serve:wds
```

Start the webpack development server only.

```
yarn run test:e2e:once
```

Run the E2E test suite one time.

```
yarn run test:e2e:gui
```

Start the Cypress E2E tests utility.

```
yarn run test:unit:once
```

Run the unit test suite one time.

```
yarn run test:unit:gui
```

Start the Cypress unit tests utility.

```
yarn run verify:coverage:for-e2e
```

Outputs the coverage infromation and verifies that enough lines are covered as
per the E2E tests requirements. It does not run any tests by itself, so please
note that the E2E test suite should be manually run right before that command.

```
yarn run verify:coverage:for-unit
```

Outputs the coverage infromation and verifies that enough lines are covered as
per the unit tests requirements. It does not run any tests by itself, so please
note that the unit test suite should be manually run right before that command.
