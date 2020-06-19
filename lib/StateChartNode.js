var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { serializeEdge, stateActions, getEventDelay, setEventDelay } from './utils';
import { EventName } from './EventName';
import { tracker } from './tracker';
import { getEdges } from './utils';
import { StyledButton } from './Button';
import { StateChartAction } from './StateChartAction';
import { StateChartGuard } from './StateChartGuard';
var StyledChildStates = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 1rem;\n  border-top: 1px solid var(--color-border);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  min-height: 1rem;\n"], ["\n  padding: 1rem;\n  border-top: 1px solid var(--color-border);\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  min-height: 1rem;\n"])));
var StyledChildStatesToggle = styled.button(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  appearance: none;\n  display: inline-flex;\n  height: 1rem;\n  width: 1rem;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n\n  &:not(:hover) {\n    opacity: 0.5;\n  }\n\n  &:before {\n    --dot-size: 3px;\n    content: '';\n    display: block;\n    height: var(--dot-size);\n    width: var(--dot-size);\n    border-radius: 50%;\n    background: var(--toggle-color, gray);\n    flex-shrink: 0;\n    box-shadow: calc(-1 * (var(--dot-size) + 1px)) 0 var(--toggle-color, gray),\n      calc(var(--dot-size) + 1px) 0 var(--toggle-color, gray);\n  }\n\n  &:focus {\n    outline: none;\n  }\n"], ["\n  appearance: none;\n  display: inline-flex;\n  height: 1rem;\n  width: 1rem;\n  justify-content: center;\n  align-items: center;\n  background: transparent;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n\n  &:not(:hover) {\n    opacity: 0.5;\n  }\n\n  &:before {\n    --dot-size: 3px;\n    content: '';\n    display: block;\n    height: var(--dot-size);\n    width: var(--dot-size);\n    border-radius: 50%;\n    background: var(--toggle-color, gray);\n    flex-shrink: 0;\n    box-shadow: calc(-1 * (var(--dot-size) + 1px)) 0 var(--toggle-color, gray),\n      calc(var(--dot-size) + 1px) 0 var(--toggle-color, gray);\n  }\n\n  &:focus {\n    outline: none;\n  }\n"])));
var StyledToken = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: var(--color-border);\n  color: inherit;\n  font-weight: bold;\n"], ["\n  background: var(--color-border);\n  color: inherit;\n  font-weight: bold;\n"])));
var StyledStateNodeHeader = styled.header(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  white-space: nowrap;\n  // position: sticky;\n  // top: calc(var(--depth, 0) * 1rem);\n  // background: rgba(255, 255, 255, 0.5);\n\n  > * {\n    padding: 0.25rem;\n  }\n\n  &:before {\n    display: none;\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background: var(--color-app-background);\n  }\n\n  &[data-type-symbol='history' i] {\n    --symbol-color: orange;\n  }\n\n  &[data-type-symbol] {\n    padding-right: 5em;\n\n    &:after {\n      content: attr(data-type-symbol);\n      position: absolute;\n      top: 0;\n      right: 0;\n      border-bottom-left-radius: 0.25rem;\n      background: var(--symbol-color, gray);\n      color: white;\n      padding: 0.25rem 0.5rem;\n      font-weight: bold;\n      font-size: 0.75em;\n    }\n  }\n"], ["\n  z-index: 1;\n  display: flex;\n  flex-direction: row;\n  white-space: nowrap;\n  // position: sticky;\n  // top: calc(var(--depth, 0) * 1rem);\n  // background: rgba(255, 255, 255, 0.5);\n\n  > * {\n    padding: 0.25rem;\n  }\n\n  &:before {\n    display: none;\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background: var(--color-app-background);\n  }\n\n  &[data-type-symbol='history' i] {\n    --symbol-color: orange;\n  }\n\n  &[data-type-symbol] {\n    padding-right: 5em;\n\n    &:after {\n      content: attr(data-type-symbol);\n      position: absolute;\n      top: 0;\n      right: 0;\n      border-bottom-left-radius: 0.25rem;\n      background: var(--symbol-color, gray);\n      color: white;\n      padding: 0.25rem 0.5rem;\n      font-weight: bold;\n      font-size: 0.75em;\n    }\n  }\n"])));
var StyledStateNode = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  --color-shadow: rgba(0, 0, 0, 0.05);\n  --color-node-border: var(--color-border);\n  --state-event-gap: 0.5rem;\n  position: relative;\n  margin: 0.5rem;\n  flex-grow: 0;\n  flex-shrink: 1;\n  // background: rgba(255, 255, 255, 0.5);\n  color: #313131;\n  min-height: 1rem;\n  display: inline-grid;\n  grid-template-columns: min-content auto;\n  grid-column-gap: var(--state-event-gap);\n  border: none;\n\n  &[data-type~='machine'] {\n    display: grid;\n    border: none;\n    box-shadow: none;\n    width: 100%;\n    background: none;\n    margin: 2rem 0;\n    grid-template-columns: auto 1fr;\n\n    > ", " {\n      left: 1rem;\n      font-size: 1rem;\n    }\n\n    > ul {\n      padding-right: 1.5rem;\n    }\n  }\n  &:not([data-type~='machine']) {\n    // opacity: 0.75;\n  }\n\n  &:not([data-open='true']) ", " > * {\n    display: none;\n  }\n\n  ", " {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n  }\n\n  &[data-type~='machine'] > ", " {\n    display: none;\n  }\n\n  &[data-active] {\n    --color-node-border: var(--color-primary);\n    --color-shadow: var(--color-primary-shadow);\n    opacity: 1;\n\n    > ", " {\n      color: var(--color-primary);\n    }\n\n    > ", " {\n      --toggle-color: var(--color-primary);\n    }\n  }\n\n  &[data-preview]:not([data-active]) {\n    --color-node-border: var(--color-primary-faded);\n  }\n\n  &[data-type~='parallel'] {\n    grid-template-columns: auto 1fr;\n  }\n\n  &[data-type~='final'] {\n    > div:first-child:after {\n      content: '';\n      position: absolute;\n      top: -5px;\n      left: -5px;\n      width: calc(100% + 10px);\n      height: calc(100% + 10px);\n      border: 2px solid var(--color-node-border);\n      pointer-events: none;\n      border-radius: 6px;\n      z-index: 1;\n    }\n  }\n\n  &:before {\n    content: attr(data-key);\n    color: transparent;\n    visibility: hidden;\n    height: 1px;\n    display: block;\n  }\n\n  &:hover {\n    z-index: 2;\n  }\n"], ["\n  --color-shadow: rgba(0, 0, 0, 0.05);\n  --color-node-border: var(--color-border);\n  --state-event-gap: 0.5rem;\n  position: relative;\n  margin: 0.5rem;\n  flex-grow: 0;\n  flex-shrink: 1;\n  // background: rgba(255, 255, 255, 0.5);\n  color: #313131;\n  min-height: 1rem;\n  display: inline-grid;\n  grid-template-columns: min-content auto;\n  grid-column-gap: var(--state-event-gap);\n  border: none;\n\n  &[data-type~='machine'] {\n    display: grid;\n    border: none;\n    box-shadow: none;\n    width: 100%;\n    background: none;\n    margin: 2rem 0;\n    grid-template-columns: auto 1fr;\n\n    > ", " {\n      left: 1rem;\n      font-size: 1rem;\n    }\n\n    > ul {\n      padding-right: 1.5rem;\n    }\n  }\n  &:not([data-type~='machine']) {\n    // opacity: 0.75;\n  }\n\n  &:not([data-open='true']) ", " > * {\n    display: none;\n  }\n\n  ", " {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n  }\n\n  &[data-type~='machine'] > ", " {\n    display: none;\n  }\n\n  &[data-active] {\n    --color-node-border: var(--color-primary);\n    --color-shadow: var(--color-primary-shadow);\n    opacity: 1;\n\n    > ", " {\n      color: var(--color-primary);\n    }\n\n    > ", " {\n      --toggle-color: var(--color-primary);\n    }\n  }\n\n  &[data-preview]:not([data-active]) {\n    --color-node-border: var(--color-primary-faded);\n  }\n\n  &[data-type~='parallel'] {\n    grid-template-columns: auto 1fr;\n  }\n\n  &[data-type~='final'] {\n    > div:first-child:after {\n      content: '';\n      position: absolute;\n      top: -5px;\n      left: -5px;\n      width: calc(100% + 10px);\n      height: calc(100% + 10px);\n      border: 2px solid var(--color-node-border);\n      pointer-events: none;\n      border-radius: 6px;\n      z-index: 1;\n    }\n  }\n\n  &:before {\n    content: attr(data-key);\n    color: transparent;\n    visibility: hidden;\n    height: 1px;\n    display: block;\n  }\n\n  &:hover {\n    z-index: 2;\n  }\n"])), StyledStateNodeHeader, StyledChildStates, StyledChildStatesToggle, StyledChildStatesToggle, StyledStateNodeHeader, StyledChildStatesToggle);
var StyledStateNodeState = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  grid-column: 1 / 2;\n  align-self: self-start;\n  border-radius: 0.25rem;\n  border: 2px solid var(--color-node-border);\n  text-align: left;\n  box-shadow: 0 0.5rem 1rem var(--color-shadow);\n  color: #313131;\n  min-height: 1rem;\n  z-index: 1;\n  transition: border-color var(--duration) var(--easing);\n\n  &[data-type~='parallel'] > ", " > ", " > & {\n    border-style: dashed;\n  }\n"], ["\n  grid-column: 1 / 2;\n  align-self: self-start;\n  border-radius: 0.25rem;\n  border: 2px solid var(--color-node-border);\n  text-align: left;\n  box-shadow: 0 0.5rem 1rem var(--color-shadow);\n  color: #313131;\n  min-height: 1rem;\n  z-index: 1;\n  transition: border-color var(--duration) var(--easing);\n\n  &[data-type~='parallel'] > ", " > ", " > & {\n    border-style: dashed;\n  }\n"])), StyledChildStates, StyledStateNode);
var StyledStateNodeEvents = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  grid-column: 2 / 3;\n  padding: 0;\n  margin-right: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  &:empty {\n    display: none;\n  }\n"], ["\n  grid-column: 2 / 3;\n  padding: 0;\n  margin-right: 1rem;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n\n  &:empty {\n    display: none;\n  }\n"])));
export var StyledStateNodeActions = styled.ul(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 0.5rem;\n  z-index: 1;\n\n  &:empty {\n    display: none;\n  }\n"], ["\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  margin-bottom: 0.5rem;\n  z-index: 1;\n\n  &:empty {\n    display: none;\n  }\n"])));
var StyledEventDot = styled.div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  --size: 0.5rem;\n  position: relative;\n  display: inline-block;\n  height: var(--size);\n  width: var(--size);\n  border-radius: 50%;\n  background-color: white;\n\n  &:before {\n    content: '';\n    position: absolute;\n    top: -0.25rem;\n    right: 0;\n    width: calc(100% + 0.5rem);\n    height: calc(100% + 0.5rem);\n    border-radius: inherit;\n    background-color: var(--color-event);\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0.25rem;\n    width: 100%;\n    height: 100%;\n    border-radius: inherit;\n    background-color: white;\n  }\n"], ["\n  --size: 0.5rem;\n  position: relative;\n  display: inline-block;\n  height: var(--size);\n  width: var(--size);\n  border-radius: 50%;\n  background-color: white;\n\n  &:before {\n    content: '';\n    position: absolute;\n    top: -0.25rem;\n    right: 0;\n    width: calc(100% + 0.5rem);\n    height: calc(100% + 0.5rem);\n    border-radius: inherit;\n    background-color: var(--color-event);\n  }\n\n  &:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    right: 0.25rem;\n    width: 100%;\n    height: 100%;\n    border-radius: inherit;\n    background-color: white;\n  }\n"])));
var StyledEventButtonLabel = styled.label(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  white-space: nowrap;\n"], ["\n  white-space: nowrap;\n"])));
var StyledEventButton = styled.button(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  --color-event: var(--color-primary);\n  padding: 0;\n  position: relative;\n  appearance: none;\n  border: 2px solid var(--color-event);\n  background: white;\n  color: white;\n  font-size: 0.75em;\n  font-weight: bold;\n  cursor: pointer;\n  border-radius: 2rem;\n  line-height: 1;\n  display: inline-flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  overflow: hidden;\n\n  > * {\n    padding: 0.15rem 0.35rem;\n  }\n\n  > label {\n    background-color: var(--color-event);\n    cursor: inherit;\n    text-align: left;\n    transition: background var(--duration) var(--easing);\n\n    &:empty {\n      display: none;\n    }\n\n    &:first-child:last-child {\n      width: 100%;\n    }\n  }\n\n  &:not(:disabled):not([data-builtin]):hover {\n    --color-event: var(--color-primary);\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    --color-event: var(--color-disabled);\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  // duration\n  &[data-delay] {\n    > * {\n      background: none;\n    }\n\n    &:not([disabled]):before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: var(--color-event);\n      animation: move-left calc(var(--delay) * 1ms) linear;\n      z-index: 0;\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes move-left {\n    from {\n      transform: translateX(-100%);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  &[data-builtin] {\n    color: black;\n    font-style: italic;\n  }\n\n  &[data-transient] {\n    > ", " {\n      order: -1;\n    }\n  }\n"], ["\n  --color-event: var(--color-primary);\n  padding: 0;\n  position: relative;\n  appearance: none;\n  border: 2px solid var(--color-event);\n  background: white;\n  color: white;\n  font-size: 0.75em;\n  font-weight: bold;\n  cursor: pointer;\n  border-radius: 2rem;\n  line-height: 1;\n  display: inline-flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  overflow: hidden;\n\n  > * {\n    padding: 0.15rem 0.35rem;\n  }\n\n  > label {\n    background-color: var(--color-event);\n    cursor: inherit;\n    text-align: left;\n    transition: background var(--duration) var(--easing);\n\n    &:empty {\n      display: none;\n    }\n\n    &:first-child:last-child {\n      width: 100%;\n    }\n  }\n\n  &:not(:disabled):not([data-builtin]):hover {\n    --color-event: var(--color-primary);\n  }\n\n  &:disabled {\n    cursor: not-allowed;\n    --color-event: var(--color-disabled);\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  // duration\n  &[data-delay] {\n    > * {\n      background: none;\n    }\n\n    &:not([disabled]):before {\n      content: '';\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 100%;\n      background-color: var(--color-event);\n      animation: move-left calc(var(--delay) * 1ms) linear;\n      z-index: 0;\n      opacity: 0.5;\n    }\n  }\n\n  @keyframes move-left {\n    from {\n      transform: translateX(-100%);\n    }\n    to {\n      transform: none;\n    }\n  }\n\n  &[data-builtin] {\n    color: black;\n    font-style: italic;\n  }\n\n  &[data-transient] {\n    > ", " {\n      order: -1;\n    }\n  }\n"])), StyledEventDot);
var StyledEvent = styled.div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  list-style: none;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n\n  &:not(:last-child) {\n    margin-bottom: 0.25rem;\n  }\n\n  &[data-disabled] > ", " {\n    opacity: 0.7;\n  }\n\n  &[data-internal] {\n  }\n"], ["\n  list-style: none;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n\n  &:not(:last-child) {\n    margin-bottom: 0.25rem;\n  }\n\n  &[data-disabled] > ", " {\n    opacity: 0.7;\n  }\n\n  &[data-internal] {\n  }\n"])), StyledStateNodeActions);
var StyledStateNodeAction = styled.div(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n\n  &:before {\n    content: '\u2192';\n    margin-right: 0.5ch;\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  list-style: none;\n  padding: 0;\n  margin: 0;\n\n  &:before {\n    content: '\u2192';\n    margin-right: 0.5ch;\n  }\n"])));
var StyledActiveAnim = styled.div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 0;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  animation: bg 1s both;\n  background: var(--color-primary);\n  will-change: opacity;\n\n  @keyframes bg {\n    from {\n      opacity: 0.5;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n"], ["\n  position: absolute;\n  z-index: 0;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n  animation: bg 1s both;\n  background: var(--color-primary);\n  will-change: opacity;\n\n  @keyframes bg {\n    from {\n      opacity: 0.5;\n    }\n    to {\n      opacity: 0;\n    }\n  }\n"])));
export var StateChartNode = function (props) {
    // get toggled value from localStorage
    var toggledValue = localStorage.getItem(props.stateNode.id + "_toggled");
    var toggled = toggledValue === null || toggledValue === '1';
    var _a = useState(toggled), toggledState = _a[0], setToggledState = _a[1];
    var stateRef = useRef();
    useEffect(function () {
        tracker.update(props.stateNode.id, stateRef.current);
    });
    useEffect(function () {
        tracker.updateAll();
    }, [toggledState]);
    var _b = useState(0), timerRestarts = _b[0], setTimerRestarts = _b[1];
    var stateNode = props.stateNode, current = props.current, preview = props.preview, onEvent = props.onEvent, onPreEvent = props.onPreEvent, onExitPreEvent = props.onExitPreEvent, onReset = props.onReset, transitionCount = props.transitionCount;
    useEffect(function () {
        if (current.actions.some(function (action) {
            return (action.type === 'xstate.cancel' &&
                action.sendId.indexOf(stateNode.id) > 0);
        })) {
            setTimerRestarts(timerRestarts + 1);
        }
    }, [current]);
    var isActive = !stateNode.parent || current.matches(stateNode.path.join('.')) || undefined;
    var isPreview = preview
        ? preview.matches(stateNode.path.join('.')) || undefined
        : undefined;
    var dataType = stateNode.parent
        ? stateNode.type
        : "machine " + stateNode.type;
    return (React.createElement(StyledStateNode, { key: stateNode.id, "data-key": stateNode.key, "data-type": dataType, "data-active": isActive && stateNode.parent, "data-preview": isPreview && stateNode.parent, "data-open": toggledState || undefined, ref: stateRef },
        React.createElement(StyledStateNodeState, { "data-id": stateNode.id, "data-type": dataType },
            isActive && (dataType === 'atomic' || dataType === 'final') && (React.createElement(StyledActiveAnim, { key: transitionCount, style: {
                    // @ts-ignore
                    '--level': props.level
                } })),
            React.createElement(StyledStateNodeHeader, { style: {
                    // @ts-ignore
                    '--depth': stateNode.path.length
                } },
                dataType === 'history' && React.createElement(StyledToken, null, "H"),
                React.createElement("strong", { title: "#" + stateNode.id }, stateNode.key),
                stateNode.path.length === 0 ? (React.createElement(StyledButton, { "data-variant": "link", onClick: onReset ? function () { return onReset(); } : undefined, title: "Reset machine to its initial state" }, "Reset")) : null),
            !!stateActions(stateNode).length && (React.createElement(React.Fragment, null,
                React.createElement(StyledStateNodeActions, null, stateNode.definition.entry.map(function (action) {
                    var actionString = action.type;
                    return (React.createElement(StateChartAction, { key: actionString, "data-action-type": "entry", action: action }));
                })),
                React.createElement(StyledStateNodeActions, null, stateNode.definition.exit.map(function (action) {
                    var actionString = action.type;
                    return (React.createElement(StateChartAction, { key: actionString, "data-action-type": "exit", action: action }));
                })))),
            React.createElement(StyledStateNodeActions, { "data-title": "invoke" }, stateNode.invoke.map(function (invocation) {
                return (React.createElement(StateChartAction, { key: invocation.id, "data-action-type": "invoke", action: invocation }, invocation.id));
            })),
            Object.keys(stateNode.states).length ? (React.createElement(StyledChildStates, null, Object.keys(stateNode.states || []).map(function (key) {
                var childStateNode = stateNode.states[key];
                return (React.createElement(StateChartNode, { stateNode: childStateNode, level: props.level + 1, current: current, preview: preview, key: childStateNode.id, onEvent: onEvent, onPreEvent: onPreEvent, onExitPreEvent: onExitPreEvent, toggledStates: props.toggledStates, onSelectServiceId: props.onSelectServiceId, transitionCount: props.transitionCount }));
            }))) : null,
            Object.keys(stateNode.states).length > 0 ? (React.createElement(StyledChildStatesToggle, { title: toggledState ? 'Hide children' : 'Show children', onClick: function (e) {
                    e.stopPropagation();
                    // remember toggled value
                    var toggled = !toggledState;
                    localStorage.setItem(stateNode.id + "_toggled", toggled ? '1' : '');
                    setToggledState(toggled);
                } })) : null),
        React.createElement(StyledStateNodeEvents, null, getEdges(stateNode, { depth: 0 }).map(function (edge) {
            var ownEvent = edge.event;
            var isBuiltInEvent = ownEvent.indexOf('xstate.') === 0;
            var guard = edge.transition.cond;
            var valid = guard && guard.predicate
                ? guard.predicate(current.context, current.event, {
                    cond: guard
                })
                : true;
            var disabled = !valid || !isActive || current.nextEvents.indexOf(ownEvent) === -1;
            // || (!!edge.cond &&
            //   typeof edge.cond === 'function' &&
            //   !edge.cond(current.context, { type: ownEvent }, { cond: undefined, }));
            var transition = edge.transition;
            var delay = isBuiltInEvent ? getEventDelay(ownEvent) : undefined;
            var ownEventName = ownEvent;
            if (typeof delay === 'string') {
                var delayExpr = stateNode.machine.options.delays[delay];
                if (delayExpr) {
                    delay =
                        typeof delayExpr === 'number'
                            ? delayExpr
                            : delayExpr(current.context, current.event, current.meta);
                    ownEventName = setEventDelay(ownEvent, +delay);
                }
                else if (typeof transition.delay === 'function') {
                    delay = transition.delay(current.context, current.event, current.meta);
                    ownEventName = setEventDelay(ownEvent, +delay);
                }
            }
            var isTransient = ownEvent === '';
            return (React.createElement(StyledEvent, { style: {
                    //@ts-ignore
                    '--delay': delay || 0
                }, "data-disabled": disabled || undefined, key: serializeEdge(edge), "data-internal": edge.transition.internal || undefined },
                React.createElement(StyledEventButton, { onClick: function () {
                        return !isBuiltInEvent ? onEvent(ownEvent) : undefined;
                    }, onMouseEnter: function () { return onPreEvent(ownEvent); }, onMouseLeave: function () { return onExitPreEvent(); }, disabled: disabled, "data-delay": delay, key: timerRestarts, "data-builtin": isBuiltInEvent || undefined, "data-transient": isTransient || undefined, "data-id": serializeEdge(edge), title: ownEvent },
                    React.createElement(StyledEventButtonLabel, null,
                        React.createElement(EventName, { event: ownEventName })),
                    edge.transition.cond && (React.createElement(StateChartGuard, { guard: edge.transition.cond, state: current }))),
                !!(edge.transition.actions.length || edge.transition.cond) && (React.createElement(StyledStateNodeActions, null, edge.transition.actions.map(function (action, i) {
                    return (React.createElement(StateChartAction, { key: i, action: action, "data-action-type": "do" }));
                })))));
        }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
