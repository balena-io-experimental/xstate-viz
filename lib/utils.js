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
