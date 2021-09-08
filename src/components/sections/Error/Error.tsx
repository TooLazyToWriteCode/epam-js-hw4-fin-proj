import MuiAlert from "@material-ui/lab/Alert";

import { useBlock } from "@/stylesheets/Block";

export const Error: React.FC = () => {
    const block = useBlock();

    return (
        <MuiAlert className={block.centered} severity="error">
            An error has occured. Please, try to reload the page.
        </MuiAlert>
    );
};
