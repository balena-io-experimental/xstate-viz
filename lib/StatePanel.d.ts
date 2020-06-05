import React from 'react';
import { State, Interpreter } from 'xstate';
export declare const StatePanel: React.FunctionComponent<{
    state: State<any, any>;
    service: Interpreter<any>;
}>;
