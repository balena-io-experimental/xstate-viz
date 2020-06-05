import React from 'react';
import { State, Interpreter } from 'xstate';
export declare const StyledHeader: import("styled-components").StyledComponent<"header", any, {}, never>;
export declare const StyledLogo: import("styled-components").StyledComponent<React.FunctionComponent<{
    className?: string | undefined;
}>, any, {}, never>;
export declare const StyledLink: import("styled-components").StyledComponent<"a", any, {}, never>;
export declare const StyledLinks: import("styled-components").StyledComponent<"nav", any, {}, never>;
interface GithubUser {
    login: string;
    avatar_url: string;
}
interface AppMachineContext {
    query: {
        gist?: string;
        code?: string;
        layout?: string;
    };
    token?: string;
    machine: any;
    user?: GithubUser;
    /**
     * Gist ID
     */
    gist?: {
        id: string;
        owner: GithubUser;
    };
}
export declare const AppContext: React.Context<{
    state: State<AppMachineContext>;
    send: (event: any) => void;
    service: Interpreter<AppMachineContext>;
}>;
export declare function App(): JSX.Element;
export {};
