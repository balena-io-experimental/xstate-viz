var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
var StyledSCGuard = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 0.5rem;\n"], ["\n  padding: 0 0.5rem;\n"])));
export var StateChartGuard = function (_a) {
    var guard = _a.guard, state = _a.state;
    var valid = guard.predicate && typeof guard.predicate === 'function'
        ? guard.predicate(state.context, state.event, { cond: guard })
        : undefined;
    return (React.createElement(StyledSCGuard, { style: {
            color: valid === undefined
                ? 'var(--color-gray)'
                : valid
                    ? 'var(--color-success)'
                    : 'var(--color-failure)'
        } },
        "[",
        guard.type === 'xstate.guard' ? guard.name : guard.type,
        "]"));
};
var templateObject_1;
