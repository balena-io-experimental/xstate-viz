import React from 'react';
import { StateNode } from 'xstate';
interface InitialEdgeProps {
    source: StateNode;
    svgRef: SVGSVGElement;
    preview: boolean;
}
interface InitialEdgeState {
    sourceElement?: Element;
}
export declare class InitialEdge extends React.Component<InitialEdgeProps, InitialEdgeState> {
    state: InitialEdgeState;
    componentDidMount(): void;
    render(): JSX.Element | null;
}
export {};
