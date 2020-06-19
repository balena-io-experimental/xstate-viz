import { StateNode, TransitionDefinition, Edge, ActionObject, Guard, EventObject, DefaultContext, Action, ActionType } from 'xstate';
export declare function isChildOf(childState: StateNode, parentState: StateNode): boolean;
export declare function flatten<T>(array: T[][]): T[];
export declare function transitions(stateNode: StateNode): TransitionDefinition<any, any>[];
export declare function condToString(cond: Guard<any, any>): string;
export declare const DELAY_EVENT_REGEX: RegExp;
export declare function getEventDelay(event: string): string | number | false;
export declare function setEventDelay(event: string, delay: number): string;
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
export declare function getActionType(action: Action<any, any>): ActionType;
export declare function getEventEdges<TContext = DefaultContext, TEvent extends EventObject = EventObject>(node: StateNode<TContext, any, TEvent>, event: string): Array<Edge<TContext, TEvent>>;
export declare function getEdges<TContext = DefaultContext, TEvent extends EventObject = EventObject>(node: StateNode<TContext, any, TEvent>, options?: {
    depth: null | number;
}): Array<Edge<TContext, TEvent>>;
