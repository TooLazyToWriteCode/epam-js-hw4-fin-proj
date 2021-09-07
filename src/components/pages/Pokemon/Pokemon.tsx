import { useParams } from "react-router-dom";

import { URLParams } from "./Pokemon.types";

export const Pokemon: React.FC<{}> = () => {
    const { id } = useParams<URLParams>();
    return <></>;
};
