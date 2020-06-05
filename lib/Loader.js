var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from 'react';
import styled from 'styled-components';
var StyledLoader = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 1rem;\n  padding-top: 1.5rem;\n  margin: auto auto;\n  transform-style: preserve-3d;\n  perspective: 100px;\n  text-align: center;\n  font-size: 80%;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n\n  &:before,\n  &:after {\n    content: '';\n    width: 1rem;\n    height: 1rem;\n    top: 0;\n    left: calc(50% - 0.5rem);\n    position: absolute;\n    border: 2px solid rgba(87, 176, 234, 1);\n    border-radius: 0.2rem;\n    animation: loader-box 1s infinite both;\n  }\n\n  &:after {\n    animation-delay: 0.5s;\n  }\n\n  @keyframes loader-box {\n    from {\n      transform: rotateY(40deg) translateX(150%);\n      opacity: 0;\n    }\n    50% {\n      transform: none;\n      opacity: 1;\n    }\n    to {\n      transform: rotateY(-40deg) translateX(-150%);\n      opacity: 0;\n    }\n  }\n"], ["\n  padding: 1rem;\n  padding-top: 1.5rem;\n  margin: auto auto;\n  transform-style: preserve-3d;\n  perspective: 100px;\n  text-align: center;\n  font-size: 80%;\n  font-weight: bold;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n\n  &:before,\n  &:after {\n    content: '';\n    width: 1rem;\n    height: 1rem;\n    top: 0;\n    left: calc(50% - 0.5rem);\n    position: absolute;\n    border: 2px solid rgba(87, 176, 234, 1);\n    border-radius: 0.2rem;\n    animation: loader-box 1s infinite both;\n  }\n\n  &:after {\n    animation-delay: 0.5s;\n  }\n\n  @keyframes loader-box {\n    from {\n      transform: rotateY(40deg) translateX(150%);\n      opacity: 0;\n    }\n    50% {\n      transform: none;\n      opacity: 1;\n    }\n    to {\n      transform: rotateY(-40deg) translateX(-150%);\n      opacity: 0;\n    }\n  }\n"])));
export var Loader = function (_a) {
    var _b = _a.children, children = _b === void 0 ? 'Loading...' : _b;
    return React.createElement(StyledLoader, null, children);
};
var templateObject_1;
