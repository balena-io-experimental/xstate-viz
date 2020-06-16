import React from 'react';
import { State, Interpreter } from 'xstate';
import { EventRecord } from './StateChart';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
export declare const EventPanel: React.FunctionComponent<{
    records: EventRecord[];
    state: State<any>;
    service: Interpreter<any>;
}>;
