import React from 'react';
import { EventObject, State, StateNode } from 'xstate';
export declare const StyledStateChart: import("styled-components").StyledComponent<"div", any, {}, never>;
interface StateChartProps {
    className?: string;
    machine: StateNode<any> | string;
    onSave: (machineString: string) => void;
    height?: number | string;
}
export interface EventRecord {
    event: EventObject;
    time: number;
}
export interface StateChartState {
    machine: StateNode<any>;
    preview?: State<any, any>;
    previewEvent?: string;
    view: string;
    code: string;
    toggledStates: Record<string, boolean>;
    error?: any;
    events: Array<EventRecord>;
}
export declare function toMachine(machine: StateNode<any> | string): StateNode<any>;
export declare const StateChart: React.FC<StateChartProps>;
export {};
