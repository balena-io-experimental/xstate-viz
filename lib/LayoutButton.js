var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
export var StyledLayoutButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  appearance: none;\n  background: white;\n  box-shadow: var(--shadow);\n  font-weight: bold;\n  text-transform: uppercase;\n  padding: 0.5rem 1rem;\n  border-top-left-radius: 1rem;\n  border-bottom-left-radius: 1rem;\n  color: black;\n  border: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  z-index: 2;\n  margin-top: 1rem;\n  opacity: 0.7;\n  transition: all var(--duration) var(--easing);\n  transform: translateX(0.5rem);\n\n  &:focus,\n  &:hover {\n    outline: none;\n  }\n\n  &:hover {\n    opacity: 1;\n    transform: none;\n  }\n\n  [data-layout='viz'] & {\n    right: 100%;\n    color: black;\n  }\n"], ["\n  appearance: none;\n  background: white;\n  box-shadow: var(--shadow);\n  font-weight: bold;\n  text-transform: uppercase;\n  padding: 0.5rem 1rem;\n  border-top-left-radius: 1rem;\n  border-bottom-left-radius: 1rem;\n  color: black;\n  border: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  z-index: 2;\n  margin-top: 1rem;\n  opacity: 0.7;\n  transition: all var(--duration) var(--easing);\n  transform: translateX(0.5rem);\n\n  &:focus,\n  &:hover {\n    outline: none;\n  }\n\n  &:hover {\n    opacity: 1;\n    transform: none;\n  }\n\n  [data-layout='viz'] & {\n    right: 100%;\n    color: black;\n  }\n"])));
export var LayoutButton = function (_a) {
    var onClick = _a.onClick, children = _a.children;
    return React.createElement(StyledLayoutButton, { onClick: onClick }, children);
};
var templateObject_1;
