export interface Pokemon {
    readonly id: string;
    readonly name: string;

    caught?: Date;
    updating?: true;
}

export type PokemonsList = { [id: Pokemon["id"]]: Pokemon };
