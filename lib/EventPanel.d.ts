import React from 'react';
import { State, Interpreter } from 'xstate';
import { EventRecord } from './StateChart';
export declare const EventPanel: React.FunctionComponent<{
    records: EventRecord[];
    state: State<any>;
    service: Interpreter<any>;
}>;
