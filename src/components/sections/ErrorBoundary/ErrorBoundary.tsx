import { Component } from "react";

import { Error } from "@/components/sections/Error";

import { State } from "./ErrorBoundary.types";

export class ErrorBoundary extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // Added due to Prettier saying it's syntax error with `override` here.
    // @ts-ignore TS4114
    render() {
        if (this.state.hasError) {
            return <Error />;
        }

        return this.props.children;
    }
}
