var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import { StateChartVisualization } from './StateChartVisualization';
import styled from 'styled-components';
export var StyledStateChartContainer = styled.section(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-wrap: wrap;\n  height: min-content;\n  padding: 0 1rem;\n"], ["\n  display: flex;\n  flex-wrap: wrap;\n  height: min-content;\n  padding: 0 1rem;\n"])));
export var StateChartContainer = function (_a) {
    var service = _a.service, onReset = _a.onReset;
    return (React.createElement(StyledStateChartContainer, null,
        React.createElement(StateChartVisualization, { service: service, visible: true, onSelectService: function () { return void 0; }, onReset: onReset }),
        Array.from(service.children.values()).map(function (child) {
            if (!child.state) {
                return null;
            }
            return (React.createElement(StateChartVisualization, { key: JSON.stringify(child), service: child, visible: true, onSelectService: function () { return void 0; }, onReset: onReset }));
        })));
};
var templateObject_1;
