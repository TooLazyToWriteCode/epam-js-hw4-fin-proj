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
    -   [ ] **A "Load More" button** Loads the next section in the common list.
    -   [ ] **Endless scroll** Loads the next section as a page end is reached.
    -   [ ] **Numbered pages (traditional)** Has only one section per a page.
-   [ ] **Adaptive Design**
-   [ ] **Navigation Menu**
-   [ ] **Redux for the state management**

### Pages

-   [ ] **The main page** Contains tiles with diferent pokemons. Each tile
        should have a picture of a pokemon, its name and a "Catch" button. If
        a pokemon is already caught, then a button should be disabled. When a
        pokemon is clicked, a user should be redirected to a pokemon page.
-   [ ] **A pokemon page** Contains information for a given pokemon, such as an
        ID, a name, a picture, whether it is caught. If a pokemon is indeed
        caught, a date when a pokemon was caught should additionally be shown.
-   [ ] **The caught pokemons page** Is same as the main page but only caught
        pokemons should be shown.

## Recommendations

1.  Используйте какой-нибудь CSS framework, чтобы верстка заняла минимум
    времени.
2.  Пойманных покемонов лучше выносить в отдельную коллекцию и затем связывать
    их средствами `json-server`. Подробности можно найти в документации.
3.  Постарайтесь показать себя во всей красе. Если есть какой-то опыт с
    дополнительными пакетами, не указанными в списке - не стесняйтесь их
    использовать.
4.  Приветствуется создание доступного интерфейса.
5.  Постарайтесь построить хорошую архитектуру приложения. Как минимум, стоит
    отделить бизнес-логику приложения от ее презентационного слоя (`view`).
6.  Приветствуется покрытие `unit`-тестами.
7.  Поддержка браузеров: последние версии современных браузеров.
