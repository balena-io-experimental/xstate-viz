var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { StyledButton } from './Button';
var StyledListPanelList = styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  list-style: none;\n  padding: 0;\n  overflow-y: scroll;\n"], ["\n  list-style: none;\n  padding: 0;\n  overflow-y: scroll;\n"])));
var StyledListPanelItem = styled.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  border-bottom: 1px solid #444;\n  padding: 0 0.5rem;\n\n  > pre {\n    margin: 0;\n    flex-grow: 1;\n  }\n\n  &[data-loaded] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  details {\n    width: 100%;\n  }\n\n  summary {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    height: 2rem;\n\n    > :first-child {\n      margin-right: auto;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  border-bottom: 1px solid #444;\n  padding: 0 0.5rem;\n\n  > pre {\n    margin: 0;\n    flex-grow: 1;\n  }\n\n  &[data-loaded] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  details {\n    width: 100%;\n  }\n\n  summary {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n    height: 2rem;\n\n    > :first-child {\n      margin-right: auto;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  }\n"])));
var StyledListPanel = styled.section(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: grid;\n  grid-template-rows: 1fr 10rem;\n  grid-template-areas: 'events' 'editor';\n  overflow: hidden;\n"], ["\n  display: grid;\n  grid-template-rows: 1fr 10rem;\n  grid-template-areas: 'events' 'editor';\n  overflow: hidden;\n"])));
export var ListPanel = function (_a) {
    var machines = _a.machines, service = _a.service, update = _a.onUpdate;
    var machinesRef = useRef(null);
    useEffect(function () {
        if (machinesRef.current) {
            machinesRef.current.scrollTop = machinesRef.current.scrollHeight;
        }
    }, [machinesRef.current, machines.length]);
    return (React.createElement(StyledListPanel, null,
        React.createElement(StyledListPanelList, { ref: machinesRef }, machines.map(function (_a, i) {
            var _b;
            var machine = _a.machine;
            var isCurrent = machine === service.machine;
            var _c = (_b = machine.meta) !== null && _b !== void 0 ? _b : { title: machine.id }, title = _c.title, description = _c.description;
            return (React.createElement(StyledListPanelItem, { key: i, title: "Click on 'load' to view the selected machine", "data-loaded": isCurrent || undefined },
                React.createElement("details", null,
                    React.createElement("summary", null,
                        React.createElement(React.Fragment, null,
                            React.createElement("strong", { title: title }, title),
                            React.createElement(StyledButton, { "data-variant": "link", onClick: function () { return update(machine); }, disabled: isCurrent }, "Load"))),
                    description)));
        }))));
};
var templateObject_1, templateObject_2, templateObject_3;
