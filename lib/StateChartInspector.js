var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useReducer } from 'react';
import { StateChart, Notifications } from './index';
import styled from 'styled-components';
import queryString from 'query-string';
import { notificationsActor } from './Notifications';
import { LayoutButton, StyledLayoutButton } from './LayoutButton';
var StyledApp = styled.main(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  --color-app-background: #fff;\n  --color-border: #c9c9c9;\n  --color-primary: rgba(87, 176, 234, 1);\n  --color-primary-faded: rgba(87, 176, 234, 0.5);\n  --color-primary-shadow: rgba(87, 176, 234, 0.1);\n  --color-link: rgba(87, 176, 234, 1);\n  --color-disabled: #b3b3b3;\n  --color-edge: #c9c9c9;\n  --color-edge-active: var(--color-primary);\n  --color-secondary: rgba(255, 152, 0, 1);\n  --color-secondary-light: rgba(255, 152, 0, 0.5);\n  --color-sidebar: #272722;\n  --color-gray: #555;\n  --color-failure: #ee7170;\n  --color-success: #31ae00;\n  --radius: 0.2rem;\n  --border-width: 2px;\n  --sidebar-width: 25rem;\n  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));\n  --duration: 0.2s;\n  --easing: cubic-bezier(0.5, 0, 0.5, 1);\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n  overflow: hidden;\n\n  > ", " {\n    display: inline-block;\n    grid-row: 2;\n    grid-column: -1;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 50% 50%;\n  }\n\n  &[data-embed] {\n    grid-template-rows: 0 auto;\n  }\n"], ["\n  --color-app-background: #fff;\n  --color-border: #c9c9c9;\n  --color-primary: rgba(87, 176, 234, 1);\n  --color-primary-faded: rgba(87, 176, 234, 0.5);\n  --color-primary-shadow: rgba(87, 176, 234, 0.1);\n  --color-link: rgba(87, 176, 234, 1);\n  --color-disabled: #b3b3b3;\n  --color-edge: #c9c9c9;\n  --color-edge-active: var(--color-primary);\n  --color-secondary: rgba(255, 152, 0, 1);\n  --color-secondary-light: rgba(255, 152, 0, 0.5);\n  --color-sidebar: #272722;\n  --color-gray: #555;\n  --color-failure: #ee7170;\n  --color-success: #31ae00;\n  --radius: 0.2rem;\n  --border-width: 2px;\n  --sidebar-width: 25rem;\n  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));\n  --duration: 0.2s;\n  --easing: cubic-bezier(0.5, 0, 0.5, 1);\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n  overflow: hidden;\n\n  > ", " {\n    display: inline-block;\n    grid-row: 2;\n    grid-column: -1;\n  }\n\n  @media (max-width: 900px) {\n    grid-template-columns: 50% 50%;\n  }\n\n  &[data-embed] {\n    grid-template-rows: 0 auto;\n  }\n"])), StyledLayoutButton);
function updateQuery(query) {
    if (!window.history)
        return;
    var fullQuery = __assign(__assign({}, queryString.parse(window.location.search)), query);
    window.history.replaceState(null, '', "?" + queryString.stringify(fullQuery));
}
window.updateQuery = updateQuery;
var query = queryString.parse(window.location.search);
function layoutReducer(state, event) {
    switch (state) {
        case 'full':
            switch (event) {
                case 'TOGGLE':
                    return 'viz';
                default:
                    return state;
            }
        case 'viz':
            switch (event) {
                case 'TOGGLE':
                    return 'full';
                default:
                    return state;
            }
        default:
            return state;
    }
}
export var StateChartInspector = function (_a) {
    var machine = _a.machine;
    var _b = useReducer(layoutReducer, query.layout || (!!query.embed ? 'viz' : 'full')), layout = _b[0], dispatchLayout = _b[1];
    return (React.createElement(StyledApp, { "data-layout": layout, "data-embed": query.embed },
        React.createElement(Notifications, { notifier: notificationsActor }),
        React.createElement(React.Fragment, null,
            React.createElement(StateChart, { machine: machine, onSave: function () { return void 0; } }),
            React.createElement(LayoutButton, { onClick: function () { return dispatchLayout('TOGGLE'); } }, { full: 'Hide', viz: 'Details' }[layout] || 'Show'))));
};
var templateObject_1;
