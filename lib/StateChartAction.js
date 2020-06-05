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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { actionTypes } from 'xstate/lib/actions';
import styled from 'styled-components';
import { Popover, StyledPopover } from './Popover';
import SyntaxHighlighter from 'react-syntax-highlighter';
// @ts-ignore
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';
var Code = function (_a) {
    var children = _a.children;
    return (React.createElement(SyntaxHighlighter, { language: "ts", style: monokai, customStyle: { margin: 0 } }, children));
};
var StyledStateChartAction = styled.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: baseline;\n  max-width: 30ch;\n  padding: 0 0.25rem;\n  line-height: 1rem;\n\n  &:hover > ", " {\n    opacity: 1;\n  }\n\n  &:before {\n    font-weight: bold;\n    color: var(--color-gray);\n    margin-right: 0.25rem;\n    font-size: 75%;\n    content: attr(data-action-type) ' /';\n    white-space: nowrap;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: baseline;\n  max-width: 30ch;\n  padding: 0 0.25rem;\n  line-height: 1rem;\n\n  &:hover > ", " {\n    opacity: 1;\n  }\n\n  &:before {\n    font-weight: bold;\n    color: var(--color-gray);\n    margin-right: 0.25rem;\n    font-size: 75%;\n    content: attr(data-action-type) ' /';\n    white-space: nowrap;\n  }\n"])), StyledPopover);
var StyledStateChartActionText = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"], ["\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n"])));
export var StateChartAction = function (_a) {
    var action = _a.action, dataAttrs = __rest(_a, ["action"]);
    switch (action.type) {
        case actionTypes.assign:
            return typeof action.assignment === 'function' ? (React.createElement(StyledStateChartAction, __assign({}, dataAttrs, { title: "assign" }),
                React.createElement("strong", null, "assign"))) : (React.createElement(React.Fragment, null, Object.keys(action.assignment).map(function (key) {
                return (React.createElement(StyledStateChartAction, __assign({ key: key, title: "assign " + key }, dataAttrs),
                    React.createElement(Popover, null,
                        React.createElement(Code, null, action.assignment[key].toString())),
                    React.createElement(StyledStateChartActionText, null,
                        React.createElement("strong", null, "assign"),
                        " ",
                        key)));
            })));
        case actionTypes.invoke:
            return (React.createElement(StyledStateChartAction, __assign({}, dataAttrs, { title: "invoke " + action.id }),
                React.createElement(StyledStateChartActionText, null, action.id)));
        case actionTypes.send:
            var sendAction = action;
            if (sendAction.event.type &&
                sendAction.event.type.indexOf('xstate.after') === 0) {
                return null;
            }
            return (React.createElement(StyledStateChartAction, __assign({}, dataAttrs, { title: "send " + sendAction.event.type + " to \"" + JSON.stringify(sendAction.to) + "\"" }),
                React.createElement(StyledStateChartActionText, null,
                    React.createElement("em", null, "send"),
                    " ",
                    sendAction.event.type,
                    ' ',
                    sendAction.to ? "to " + JSON.stringify(sendAction.to) : '')));
        case actionTypes.log:
            return (React.createElement(StyledStateChartAction, __assign({}, dataAttrs, { title: "log" }),
                React.createElement(StyledStateChartActionText, null,
                    React.createElement("em", null, "log"))));
        default:
            if (action.type.indexOf('xstate.') === 0 &&
                action.type !== 'xstate.invoke') {
                return null;
            }
            return (React.createElement(StyledStateChartAction, __assign({}, dataAttrs, { title: action.type }),
                React.createElement(StyledStateChartActionText, null, action.type)));
    }
};
var templateObject_1, templateObject_2;
