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
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getEdges } from './utils';
import { serializeEdge, initialStateNodes } from './utils';
import { Edge } from './Edge';
import { InitialEdge } from './InitialEdge';
import { StateChartNode } from './StateChartNode';
import { useService } from '@xstate/react';
var StyledVisualization = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  max-height: inherit;\n  margin: 0.5rem;\n  overflow-y: auto;\n"], ["\n  position: relative;\n  max-height: inherit;\n  margin: 0.5rem;\n  overflow-y: auto;\n"])));
export var StateChartVisualization = function (_a) {
    var service = _a.service, visible = _a.visible, onSelectService = _a.onSelectService, onReset = _a.onReset;
    var _b = useState(0), transitionCount = _b[0], setTransitionCount = _b[1];
    var _c = useService(service), current = _c[0], send = _c[1];
    var _d = React.useState({
        toggledStates: {},
        previewEvent: undefined,
        preview: undefined
    }), state = _d[0], setState = _d[1];
    var svgRef = React.useRef(null);
    var edges;
    try {
        edges = getEdges(service.machine);
    }
    catch (err) {
        edges = null;
        console.error(err);
    }
    useEffect(function () {
        setTransitionCount(transitionCount + 1);
    }, [current]);
    if (!visible || !edges) {
        return null;
    }
    return (React.createElement(StyledVisualization, null,
        React.createElement("svg", { width: "100%", height: "100%", style: {
                position: 'absolute',
                top: 0,
                left: 0,
                // @ts-ignore
                '--color': 'gray',
                overflow: 'visible',
                pointerEvents: 'none'
            }, ref: svgRef, key: JSON.stringify(state.toggledStates) },
            React.createElement("defs", null,
                React.createElement("marker", { id: "marker", markerWidth: "4", markerHeight: "4", refX: "2", refY: "2", markerUnits: "strokeWidth", orient: "auto" },
                    React.createElement("path", { d: "M0,0 L0,4 L4,2 z", fill: "var(--color-edge)" })),
                React.createElement("marker", { id: "marker-preview", markerWidth: "4", markerHeight: "4", refX: "2", refY: "2", markerUnits: "strokeWidth", orient: "auto" },
                    React.createElement("path", { d: "M0,0 L0,4 L4,2 z", fill: "var(--color-edge-active)" }))),
            edges.map(function (edge) {
                if (!svgRef.current) {
                    return;
                }
                // const svgRect = this.svgRef.current.getBoundingClientRect();
                return (React.createElement(Edge, { key: serializeEdge(edge), svg: svgRef.current, edge: edge, preview: edge.event === state.previewEvent &&
                        current.matches(edge.source.path.join('.')) &&
                        !!state.preview &&
                        state.preview.matches(edge.target.path.join('.')) }));
            }),
            initialStateNodes(service.machine).map(function (initialStateNode, i) {
                if (!svgRef.current) {
                    return;
                }
                return (React.createElement(InitialEdge, { key: initialStateNode.id + "_" + i, source: initialStateNode, svgRef: svgRef.current, preview: current.matches(initialStateNode.path.join('.')) ||
                        (!!state.preview &&
                            state.preview.matches(initialStateNode.path.join('.'))) }));
            })),
        React.createElement(StateChartNode, { stateNode: service.machine, current: service.state, transitionCount: transitionCount, level: 0, preview: state.preview, onReset: onReset, onEvent: function (event) {
                send(event);
            }, onPreEvent: function (event) {
                if (!state.preview) {
                    setState(__assign(__assign({}, state), { preview: service.nextState(event), previewEvent: event }));
                }
            }, onExitPreEvent: function () {
                setState(__assign(__assign({}, state), { preview: undefined, previewEvent: undefined }));
            }, onSelectServiceId: function (serviceId) {
                var s = service.children.get(serviceId);
                if (s) {
                    onSelectService(s); // TODO: pass service via context
                }
            }, toggledStates: state.toggledStates })));
};
var templateObject_1;
