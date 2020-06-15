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
import { useService } from '@xstate/react';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import * as XState from 'xstate';
import { assign, interpret, Machine, send, spawn } from 'xstate';
import { raise } from 'xstate/lib/actions';
import { EventPanel } from './EventPanel';
import { StatePanel } from './StatePanel';
import { DocsPanel } from './DocsPanel';
import { StateChartContainer, StyledStateChartContainer } from './VizTabs';
var StyledViewTab = styled.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"], ["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"])));
var StyledViewTabs = styled.ul(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n"])));
var StyledSidebar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-top-left-radius: 1rem;\n  box-shadow: var(--shadow);\n  transition: transform 0.6s cubic-bezier(0.5, 0, 0.5, 1);\n  z-index: 1;\n"], ["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-top-left-radius: 1rem;\n  box-shadow: var(--shadow);\n  transition: transform 0.6s cubic-bezier(0.5, 0, 0.5, 1);\n  z-index: 1;\n"])));
export var StyledStateChart = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  grid-area: content;\n  display: grid;\n  grid-template-columns: 1fr var(--sidebar-width, 25rem);\n  grid-template-rows: 1fr;\n  grid-template-areas: 'content sidebar';\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr 1fr;\n  }\n\n  > ", " {\n    grid-area: sidebar;\n  }\n\n  > ", " {\n    grid-area: content;\n  }\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n\n  [data-layout='viz'] & {\n    > :not(", ") {\n      grid-column: 1 / -1;\n    }\n\n    > ", " {\n      transform: translateX(100%);\n    }\n  }\n"], ["\n  grid-area: content;\n  display: grid;\n  grid-template-columns: 1fr var(--sidebar-width, 25rem);\n  grid-template-rows: 1fr;\n  grid-template-areas: 'content sidebar';\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n\n  @media (max-width: 900px) {\n    grid-template-columns: 1fr 1fr;\n  }\n\n  > ", " {\n    grid-area: sidebar;\n  }\n\n  > ", " {\n    grid-area: content;\n  }\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n\n  [data-layout='viz'] & {\n    > :not(", ") {\n      grid-column: 1 / -1;\n    }\n\n    > ", " {\n      transform: translateX(100%);\n    }\n  }\n"])), StyledSidebar, StyledStateChartContainer, StyledSidebar, StyledSidebar);
export function toMachine(machine) {
    if (typeof machine !== 'string') {
        return machine;
    }
    var createMachine;
    try {
        createMachine = new Function('Machine', 'interpret', 'assign', 'send', 'sendParent', 'spawn', 'raise', 'actions', 'XState', machine);
    }
    catch (e) {
        throw e;
    }
    var machines = [];
    var machineProxy = function (config, options) {
        var machine = Machine(config, options);
        machines.push(machine);
        return machine;
    };
    try {
        createMachine(machineProxy, interpret, assign, send, XState.sendParent, spawn, raise, XState.actions, XState);
    }
    catch (e) {
        throw e;
    }
    return machines[machines.length - 1];
}
export var StateChart = function (_a) {
    var onSave = _a.onSave, className = _a.className, props = __rest(_a, ["onSave", "className"]);
    var _b = useState(0), resetCount = _b[0], setResetCount = _b[1];
    var _c = useState([]), events = _c[0], setEvents = _c[1];
    var _d = useState(toMachine(props.machine)), machine = _d[0], setMachine = _d[1];
    useEffect(function () {
        setMachine(toMachine(props.machine));
    }, [props.machine]);
    var service = useMemo(function () {
        return interpret(machine).start();
    }, [machine, resetCount]);
    var current = useService(service)[0];
    useEffect(function () {
        var formattedEvent = {
            event: current.event,
            time: Date.now()
        };
        setEvents(events.concat(formattedEvent));
    }, [current]);
    var _e = useState((function () {
        var _machine = toMachine(props.machine);
        return {
            preview: undefined,
            previewEvent: undefined,
            view: 'state',
            machine: _machine,
            code: typeof _machine === 'string'
                ? _machine
                : "Machine(" + JSON.stringify(_machine.config, null, 2) + ")",
            toggledStates: {},
            events: []
        };
    })()), allState = _e[0], setState = _e[1];
    function renderView(current, service) {
        var view = allState.view;
        switch (view) {
            case 'state':
                return React.createElement(StatePanel, { state: current, service: service });
            case 'docs':
                return React.createElement(DocsPanel, { state: current, service: service });
            case 'events':
                return (React.createElement(EventPanel, { state: current, service: service, records: events }));
            default:
                return null;
        }
    }
    function reset(code, machine) {
        if (code === void 0) { code = allState.code; }
        if (machine === void 0) { machine = allState.machine; }
        console.log(code);
        setEvents([]);
        setResetCount(resetCount + 1);
        setMachine(machine);
        setState(__assign(__assign({}, allState), { code: code }));
    }
    var code = allState.code;
    return (React.createElement(StyledStateChart, { className: className, key: code, style: {
            background: 'var(--color-app-background)'
        } },
        React.createElement(StateChartContainer, { service: service, onReset: function () { return reset(); } }),
        React.createElement(StyledSidebar, null,
            React.createElement(StyledViewTabs, null, ['state', 'docs', 'events'].map(function (view) {
                return (React.createElement(StyledViewTab, { onClick: function () { return setState(__assign(__assign({}, allState), { view: view })); }, key: view, "data-active": allState.view === view || undefined }, view));
            })),
            renderView(current, service))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
