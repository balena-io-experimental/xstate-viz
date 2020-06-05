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
import React from 'react';
import styled from 'styled-components';
var StyledField = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n\n  margin-top: 0.5rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n  }\n\n  &[data-empty] {\n    opacity: 0.5;\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"], ["\n  &:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n\n  margin-top: 0.5rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n  }\n\n  &[data-empty] {\n    opacity: 0.5;\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"])));
function Field(_a) {
    var label = _a.label, children = _a.children, disabled = _a.disabled, style = _a.style;
    return (React.createElement(StyledField, { style: __assign(__assign({}, style), (disabled ? { opacity: 0.5 } : undefined)), "data-empty": !children || undefined },
        React.createElement("label", null, label),
        children));
}
var StyledDetails = styled.details(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0 1rem;\n\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > summary {\n    font-weight: bold;\n    font-size: 1rem;\n  }\n"], ["\n  margin: 0;\n  padding: 0 1rem;\n\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > summary {\n    font-weight: bold;\n    font-size: 1rem;\n  }\n"])));
var StyledPanelAction = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: auto 1fr;\n  grid-column-gap: 1ch;\n\n  & + & {\n    margin-top: 0.5rem;\n  }\n\n  pre {\n    margin: 0;\n  }\n"], ["\n  display: grid;\n  grid-template-columns: auto 1fr;\n  grid-column-gap: 1ch;\n\n  & + & {\n    margin-top: 0.5rem;\n  }\n\n  pre {\n    margin: 0;\n  }\n"])));
export var StatePanel = function (_a) {
    var state = _a.state, service = _a.service;
    var simplifiedState = {
        value: state.value,
        context: state.context
    };
    return (React.createElement(StyledDetails, { key: service.id, open: true },
        React.createElement("summary", null, service.id),
        React.createElement(Field, { label: "state" },
            React.createElement("pre", null, JSON.stringify(simplifiedState, null, 2))),
        React.createElement(Field, { label: "actions" }, state.actions.map(function (action, i) {
            return (React.createElement(StyledPanelAction, { key: i }, Object.keys(action).map(function (key) {
                var value = action[key];
                if (value === undefined) {
                    return null;
                }
                return (React.createElement(React.Fragment, { key: key },
                    React.createElement("strong", null,
                        key,
                        ":"),
                    React.createElement("pre", null, JSON.stringify(action[key], null, 2))));
            })));
        })),
        React.createElement(Field, { label: "Children" }, Array.from(service.children.values()).map(function (child, i) {
            if (!child.state) {
                return null;
            }
            return React.createElement(StatePanel, { state: child.state, service: child, key: i });
        }))));
};
var templateObject_1, templateObject_2, templateObject_3;
