var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import React from 'react';
export var StyledPopover = styled.aside(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  background: black;\n  color: white;\n  border-radius: var(--radius);\n  pointer-events: none;\n  opacity: 0;\n"], ["\n  position: absolute;\n  bottom: 100%;\n  left: 0;\n  background: black;\n  color: white;\n  border-radius: var(--radius);\n  pointer-events: none;\n  opacity: 0;\n"])));
export var Popover = function (_a) {
    var children = _a.children;
    return React.createElement(StyledPopover, null, children);
};
var templateObject_1;
