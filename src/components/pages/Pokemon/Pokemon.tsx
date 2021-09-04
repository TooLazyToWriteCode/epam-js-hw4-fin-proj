import { useParams } from "react-router-dom";

import "./Pokemon.scss";

/** The router (url) parameters. */
export interface Params {
    id: string;
}

/** The pokemon information page. */
export const Pokemon: React.FC<{}> = () => {
    const { id } = useParams<Params>();
    return <></>;
};

export default Pokemon;
