import React from 'react';
import { Interpreter, State } from 'xstate';
export declare const DocsPanel: React.FunctionComponent<{
    state: State<any, any>;
    service: Interpreter<any>;
}>;
