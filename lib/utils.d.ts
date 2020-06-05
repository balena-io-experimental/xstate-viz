import { StateNode, TransitionDefinition, Edge, ActionObject, Guard } from 'xstate';
export declare function isChildOf(childState: StateNode, parentState: StateNode): boolean;
export declare function flatten<T>(array: T[][]): T[];
export declare function transitions(stateNode: StateNode): TransitionDefinition<any, any>[];
export declare function condToString(cond: Guard<any, any>): string;
export declare const DELAY_EVENT_REGEX: RegExp;
export declare function getEventDelay(event: string): string | number | false;
export declare function serializeEdge(edge: Edge<any, any>): string;
export declare function isHidden(el?: Element | null): el is null;
export declare function relative(childRect: ClientRect, parentElement: Element): ClientRect;
export declare function initialStateNodes(stateNode: StateNode): StateNode[];
export declare function stateActions(stateNode: StateNode): ActionObject<any, any>[];
export interface Point {
    x: number;
    y: number;
    color?: string;
}
export declare function center(rect: ClientRect): Point;
export declare function isBuiltInEvent(eventType: string): boolean;
