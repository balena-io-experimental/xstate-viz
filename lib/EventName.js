import React from 'react';
import { DELAY_EVENT_REGEX } from './utils';
export var EventName = function (_a) {
    var event = _a.event;
    var match = event.match(DELAY_EVENT_REGEX);
    if (match) {
        var isMs = Number.isFinite(+match[1]);
        return (React.createElement("span", null,
            React.createElement("em", null, "after"),
            " ",
            match[1],
            isMs ? 'ms' : ''));
    }
    match = event.match(/^done\.state/);
    if (match) {
        return (React.createElement("span", null,
            React.createElement("em", null, "done")));
    }
    match = event.match(/^done\.invoke\.(.+)/);
    if (match) {
        return (React.createElement("span", null,
            React.createElement("em", null, "done"),
            " (",
            match[1],
            ")"));
    }
    match = event.match(/^error\.platform\.(.+)/);
    if (match) {
        return (React.createElement("span", null,
            React.createElement("em", null, "error"),
            " (",
            match[1],
            ")"));
    }
    return React.createElement("span", null, event);
};
