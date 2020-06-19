import React from 'react';
import { StateNode, Interpreter } from 'xstate';
export declare const ListPanel: React.FunctionComponent<{
    service: Interpreter<any>;
    machines: StateNode<any>[];
    onUpdate: (machine: StateNode<any>) => void;
}>;
