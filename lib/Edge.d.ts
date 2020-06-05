import React, { Component } from 'react';
import * as XState from 'xstate';
import { TrackerData } from './tracker';
interface EdgeProps {
    edge: XState.Edge<any, any>;
    preview: boolean;
    svg: SVGSVGElement;
}
interface EdgeState {
    eventElement: Element | null;
    sourceElement: Element | null;
    targetElement: Element | null;
    sourceData: TrackerData | undefined;
    targetData: TrackerData | undefined;
    eventData: TrackerData | undefined;
}
export declare class Edge extends Component<EdgeProps, EdgeState> {
    state: {
        eventElement: null;
        sourceElement: null;
        targetElement: null;
        sourceData: TrackerData | undefined;
        targetData: TrackerData | undefined;
        eventData: TrackerData | undefined;
    };
    ref: React.RefObject<SVGPathElement>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
}
export {};
