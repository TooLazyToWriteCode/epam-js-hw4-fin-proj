export interface Pokemon {
    readonly id: string;
    readonly name: string;

    caught?: Date;
}

export type PokemonsList = { [id: Pokemon["id"]]: Pokemon };
