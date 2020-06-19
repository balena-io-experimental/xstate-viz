export function isChildOf(childState, parentState) {
    var marker = childState;
    while (marker.parent && marker.parent !== parentState) {
        marker = marker.parent;
    }
    return marker === parentState;
}
export function flatten(array) {
    var _a;
    return (_a = []).concat.apply(_a, array);
}
export function transitions(stateNode) {
    return flatten(stateNode.ownEvents.map(function (event) {
        return stateNode.definition.on[event];
    }));
}
export function condToString(cond) {
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
export var DELAY_EVENT_REGEX = /^xstate\.after\((.+)\)#/;
export function getEventDelay(event) {
    var match = event.match(DELAY_EVENT_REGEX);
    if (match) {
        return Number.isFinite(+match[1]) ? +match[1] : match[1];
    }
    return false;
}
export function setEventDelay(event, delay) {
    var match = event.match(DELAY_EVENT_REGEX);
    if (match) {
        return event.replace(match[1], delay.toString());
    }
    return event;
}
export function serializeEdge(edge) {
    var cond = edge.cond ? "[" + edge.cond.toString().replace(/\n/g, '') + "]" : '';
    return edge.source.id + ":" + edge.event + cond + "->" + edge.target.id;
}
export function isHidden(el) {
    if (!el) {
        return true;
    }
    var rect = el.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
        return true;
    }
    return false;
}
export function relative(childRect, parentElement) {
    var parentRect = parentElement.getBoundingClientRect();
    return {
        top: childRect.top - parentRect.top,
        right: childRect.right - parentRect.left,
        bottom: childRect.bottom - parentRect.top,
        left: childRect.left - parentRect.left,
        width: childRect.width,
        height: childRect.height
    };
}
export function initialStateNodes(stateNode) {
    var stateKeys = Object.keys(stateNode.states);
    return stateNode.initialStateNodes.concat(flatten(stateKeys.map(function (key) {
        var childStateNode = stateNode.states[key];
        if (childStateNode.type === 'compound' ||
            childStateNode.type === 'parallel') {
            return initialStateNodes(stateNode.states[key]);
        }
        return [];
    })));
}
export function stateActions(stateNode) {
    return stateNode.onEntry.concat(stateNode.onExit);
}
export function center(rect) {
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
    };
}
export function isBuiltInEvent(eventType) {
    return (eventType.indexOf('xstate.') === 0 ||
        eventType.indexOf('done.') === 0 ||
        eventType === '');
}
export function getActionType(action) {
    try {
        return typeof action === 'string' || typeof action === 'number'
            ? "" + action
            : typeof action === 'function'
                ? action.name
                : action.type;
    }
    catch (e) {
        throw new Error('Actions must be strings or objects with a string action.type property.');
    }
}
export function getEventEdges(node, event) {
    var transitions = node.definition.on[event];
    return flatten(transitions.map(function (transition) {
        var targets = transition.target
            ? [].concat(transition.target)
            : undefined;
        if (!targets) {
            return [
                {
                    source: node,
                    target: node,
                    event: event,
                    actions: transition.actions
                        ? transition.actions.map(getActionType)
                        : [],
                    cond: transition.cond,
                    transition: transition
                }
            ];
        }
        return targets
            .map(function (target) {
            try {
                var targetNode = target
                    ? node.getRelativeStateNodes(target, undefined, false)[0]
                    : node;
                return {
                    source: node,
                    target: targetNode,
                    event: event,
                    actions: transition.actions
                        ? transition.actions.map(getActionType)
                        : [],
                    cond: transition.cond,
                    transition: transition
                };
            }
            catch (e) {
                if (process.env.NODE_ENV != 'production') {
                    console.warn(e, "Target '" + target + "' not found on '" + node.id + "'");
                }
                return undefined;
            }
        })
            .filter(function (maybeEdge) { return maybeEdge !== undefined; });
    }));
}
export function getEdges(node, options) {
    var _a = (options || {}).depth, depth = _a === void 0 ? null : _a;
    var edges = [];
    if (node.states && depth === null) {
        for (var _i = 0, _b = Object.keys(node.states); _i < _b.length; _i++) {
            var stateKey = _b[_i];
            edges.push.apply(edges, getEdges(node.states[stateKey]));
        }
    }
    else if (depth && depth > 0) {
        for (var _c = 0, _d = Object.keys(node.states); _c < _d.length; _c++) {
            var stateKey = _d[_c];
            edges.push.apply(edges, getEdges(node.states[stateKey], {
                depth: depth - 1
            }));
        }
    }
    for (var _e = 0, _f = Object.keys(node.on); _e < _f.length; _e++) {
        var event_1 = _f[_e];
        edges.push.apply(edges, getEventEdges(node, event_1));
    }
    return edges;
}
