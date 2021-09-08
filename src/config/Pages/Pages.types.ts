export interface Page {
    readonly name: string;
    readonly path: string;
}

export interface Pages {
    readonly caught: Page;
    readonly error404: Page;
    readonly home: Page;
    readonly pokemon: Page;
}
