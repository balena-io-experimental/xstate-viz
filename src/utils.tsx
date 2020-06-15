import {
  StateNode,
  TransitionDefinition,
  Edge,
  ActionObject,
  Guard,
  EventObject,
  DefaultContext,
  Action,
  ActionType
} from 'xstate';

export function isChildOf(
  childState: StateNode,
  parentState: StateNode
): boolean {
  let marker = childState;

  while (marker.parent && marker.parent !== parentState) {
    marker = marker.parent;
  }

  return marker === parentState;
}

export function flatten<T>(array: T[][]): T[] {
  return ([] as T[]).concat(...array);
}

export function transitions(
  stateNode: StateNode
): TransitionDefinition<any, any>[] {
  return flatten(
    stateNode.ownEvents.map((event: string) => {
      return stateNode.definition.on[event];
    })
  );
}

export function condToString(cond: Guard<any, any>) {
  return cond.type;
  // if (typeof cond === "function") {
  //   return cond.toString();
  //   // return cond
  //   //   .toString()
  //   //   .replace(/\n/g, "")
  //   //   .match(/\{(.*)\}/)![1]
  //   //   .trim();
  // }

  // return cond;
}

export const DELAY_EVENT_REGEX = /^xstate\.after\((.+)\)#/;

export function getEventDelay(event: string): string | number | false {
  let match = event.match(DELAY_EVENT_REGEX);

  if (match) {
    return Number.isFinite(+match[1]) ? +match[1] : match[1];
  }

  return false;
}

export function serializeEdge(edge: Edge<any, any>): string {
  const cond = edge.cond ? `[${edge.cond.toString().replace(/\n/g, '')}]` : '';
  return `${edge.source.id}:${edge.event}${cond}->${edge.target.id}`;
}

export function isHidden(el?: Element | null): el is null {
  if (!el) {
    return true;
  }
  const rect = el.getBoundingClientRect();

  if (rect.width === 0 && rect.height === 0) {
    return true;
  }

  return false;
}

export function relative(
  childRect: ClientRect,
  parentElement: Element
): ClientRect {
  const parentRect = parentElement.getBoundingClientRect();

  return {
    top: childRect.top - parentRect.top,
    right: childRect.right - parentRect.left,
    bottom: childRect.bottom - parentRect.top,
    left: childRect.left - parentRect.left,
    width: childRect.width,
    height: childRect.height
  };
}

export function initialStateNodes(stateNode: StateNode): StateNode[] {
  const stateKeys = Object.keys(stateNode.states);

  return stateNode.initialStateNodes.concat(
    flatten(
      stateKeys.map((key) => {
        const childStateNode = stateNode.states[key];
        if (
          childStateNode.type === 'compound' ||
          childStateNode.type === 'parallel'
        ) {
          return initialStateNodes(stateNode.states[key]);
        }

        return [];
      })
    )
  );
}

export function stateActions(stateNode: StateNode): ActionObject<any, any>[] {
  return stateNode.onEntry.concat(stateNode.onExit);
}

export interface Point {
  x: number;
  y: number;
  color?: string;
}

export function center(rect: ClientRect): Point {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

export function isBuiltInEvent(eventType: string): boolean {
  return (
    eventType.indexOf('xstate.') === 0 ||
    eventType.indexOf('done.') === 0 ||
    eventType === ''
  );
}

export function getActionType(action: Action<any, any>): ActionType {
  try {
    return typeof action === 'string' || typeof action === 'number'
      ? `${action}`
      : typeof action === 'function'
      ? action.name
      : action.type;
  } catch (e) {
    throw new Error(
      'Actions must be strings or objects with a string action.type property.'
    );
  }
}

export function getEventEdges<
  TContext = DefaultContext,
  TEvent extends EventObject = EventObject
>(
  node: StateNode<TContext, any, TEvent>,
  event: string
): Array<Edge<TContext, TEvent>> {
  const transitions: Array<TransitionDefinition<TContext, TEvent>> =
    node.definition.on[event];

  return flatten(
    transitions.map((transition) => {
      const targets = transition.target
        ? ([] as StateNode<TContext, any, TEvent, any>[]).concat(
            transition.target
          )
        : undefined;

      if (!targets) {
        return [
          {
            source: node,
            target: node,
            event,
            actions: transition.actions
              ? transition.actions.map(getActionType)
              : [],
            cond: transition.cond,
            transition
          }
        ];
      }

      return targets
        .map<Edge<TContext, TEvent> | undefined>((target) => {
          try {
            const targetNode = target
              ? node.getRelativeStateNodes(target, undefined, false)[0]
              : node;

            return {
              source: node,
              target: targetNode,
              event,
              actions: transition.actions
                ? transition.actions.map(getActionType)
                : [],
              cond: transition.cond,
              transition
            };
          } catch (e) {
            if (process.env.NODE_ENV != 'production') {
              console.warn(e, `Target '${target}' not found on '${node.id}'`);
            }
            return undefined;
          }
        })
        .filter((maybeEdge) => maybeEdge !== undefined) as Array<
        Edge<TContext, TEvent>
      >;
    })
  );
}

export function getEdges<
  TContext = DefaultContext,
  TEvent extends EventObject = EventObject
>(
  node: StateNode<TContext, any, TEvent>,
  options?: { depth: null | number }
): Array<Edge<TContext, TEvent>> {
  const { depth = null } = options || {};
  const edges: Array<Edge<TContext, TEvent>> = [];

  if (node.states && depth === null) {
    for (const stateKey of Object.keys(node.states)) {
      edges.push(...getEdges(node.states[stateKey]));
    }
  } else if (depth && depth > 0) {
    for (const stateKey of Object.keys(node.states)) {
      edges.push(
        ...getEdges(node.states[stateKey], {
          depth: depth - 1
        })
      );
    }
  }

  for (const event of Object.keys(node.on)) {
    edges.push(...getEventEdges<TContext, TEvent>(node, event));
  }

  return edges;
}
