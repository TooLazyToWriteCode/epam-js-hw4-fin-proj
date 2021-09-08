import MuiAlert from "@material-ui/lab/Alert";

import { useBlock } from "@/stylesheets/Block";

export const Error404: React.FC = () => {
    const block = useBlock();

    return (
        <MuiAlert className={block.centered} severity="error">
            This page does not exist.
        </MuiAlert>
    );
};
