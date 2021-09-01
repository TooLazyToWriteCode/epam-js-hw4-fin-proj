import { useParams } from "react-router-dom";

import "./Pokemon.scss";

/** The router (url) parameters. */
export type Params = { id: string };

/** The pokemon information page. */
export const Pokemon: React.FC<{}> = () => {
    const { id } = useParams() as Params;
    return <div>The pokemon (ID: {id}) information page</div>;
};

export default Pokemon;
