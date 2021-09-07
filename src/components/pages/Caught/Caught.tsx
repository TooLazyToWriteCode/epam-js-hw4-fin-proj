import { getCaughtPokemons } from "@/actions/Pokemons";
import { PokeScroll } from "@/components/parts/PokeScroll";

export const Caught: React.FC<{}> = () => (
    <PokeScroll getCallback={getCaughtPokemons} showButtons={false} />
);
