import { getPokemons } from "@/actions/Pokemons";
import { PokeScroll } from "@/components/parts/PokeScroll";

export const Home: React.FC<{}> = () => (
    <PokeScroll getCallback={getPokemons} showButtons={true} />
);
