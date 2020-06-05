var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { serializeEdge, isHidden, relative, center } from './utils';
import { tracker } from './tracker';
function maybeGet(value, getter) {
    return value ? getter(value) : undefined;
}
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            eventElement: null,
            sourceElement: null,
            targetElement: null,
            sourceData: tracker.get(_this.props.edge.source.id),
            targetData: tracker.get(_this.props.edge.target.id),
            eventData: tracker.get(serializeEdge(_this.props.edge))
        };
        _this.ref = React.createRef();
        return _this;
    }
    Edge.prototype.componentDidMount = function () {
        var _this = this;
        var edge = this.props.edge;
        var eventId = serializeEdge(edge);
        tracker.listen(eventId, function (data) {
            _this.setState({ eventData: data });
        });
        tracker.listen(edge.source.id, function (data) {
            _this.setState({ sourceData: data });
        });
        tracker.listen(edge.target.id, function (data) {
            var target = edge.target;
            var parentData = data;
            while (isHidden(parentData.element)) {
                if (!target.parent) {
                    break;
                }
                target = target.parent;
                parentData = tracker.get(target.id);
                if (!parentData) {
                    break;
                }
            }
            _this.setState({ targetData: parentData || undefined });
        });
    };
    Edge.prototype.componentWillUnmount = function () {
        var edge = this.props.edge;
        var eventId = serializeEdge(edge);
        tracker.unlisten(eventId);
        tracker.unlisten(edge.source.id);
        tracker.unlisten(edge.target.id);
    };
    Edge.prototype.render = function () {
        var edge = this.props.edge;
        var _a = this.state, sourceData = _a.sourceData, eventData = _a.eventData, targetData = _a.targetData;
        if (!sourceData ||
            sourceData.hidden ||
            !eventData ||
            eventData.hidden ||
            !targetData ||
            targetData.hidden) {
            return null;
        }
        var strokeWidth = 2;
        var svgRef = this.props.svg;
        var sourceRect = relative(this.state.sourceData.rect, svgRef);
        var eventRect = relative(this.state.eventData.rect, svgRef);
        var eventContainerRect = relative(this.state.eventData.element.parentElement.getBoundingClientRect(), svgRef);
        var targetRect = relative(this.state.targetData.rect, svgRef);
        var magic = 10;
        var borderOffset = 5;
        var eventCenterPt = center(eventRect);
        var targetCenterPt = center(targetRect);
        var isSelf = edge.source === edge.target;
        var isInternal = edge.transition.internal;
        var ptFns = [];
        if (isInternal) {
            ptFns.push(function () { return ({
                x: eventRect.left,
                y: eventCenterPt.y
            }); });
            ptFns.push(function (prevPt) { return ({
                x: sourceRect.right,
                y: prevPt.y
            }); });
            if (!isSelf) {
                ptFns.push(function (prevPt) { return ({
                    x: targetRect.right,
                    y: prevPt.y,
                    color: 'green'
                }); }, function () { return ({
                    x: targetRect.right - magic,
                    y: targetRect.top - magic
                }); }, function (prevPt) { return ({
                    x: prevPt.x,
                    y: targetRect.top
                }); });
            }
            else {
                ptFns.push(function (prevPt) {
                    if (prevPt.y > sourceRect.bottom) {
                        return {
                            x: targetRect.right - magic,
                            y: sourceRect.bottom
                        };
                    }
                    else {
                        return {
                            x: targetRect.right,
                            y: prevPt.y
                        };
                    }
                });
            }
        }
        else if (isSelf) {
            ptFns.push(function () { return ({
                x: sourceRect.right,
                y: Math.min(eventCenterPt.y, sourceRect.bottom)
            }); }, function (prevPt) { return ({
                x: eventRect.left,
                y: eventCenterPt.y
            }); }, function (prevPt) { return ({
                x: eventRect.right,
                y: eventCenterPt.y
            }); }, function (prevPt) { return ({
                x: eventRect.right + magic,
                y: eventRect.bottom
            }); }, function (prevPt) { return ({
                x: eventRect.right + magic * 2,
                y: eventCenterPt.y
            }); }, function (prevPt) { return ({
                x: eventRect.right + magic,
                y: eventRect.top
            }); }, function (prevPt) { return ({
                x: eventRect.right,
                y: eventCenterPt.y
            }); });
        }
        else {
            // go through event label
            ptFns.push(function () { return ({
                x: sourceRect.right,
                y: Math.min(eventCenterPt.y, sourceRect.bottom)
            }); }, function () { return ({
                x: eventRect.left,
                y: eventCenterPt.y
            }); }, function () { return ({
                x: eventRect.left,
                y: eventCenterPt.y
            }); }, function () { return ({
                x: eventRect.right,
                y: eventCenterPt.y
            }); });
            var startPt_1 = {
                x: eventRect.right + magic,
                y: eventCenterPt.y
            };
            var endSide = void 0;
            var endPtX = startPt_1.x < targetRect.right && startPt_1.x > targetRect.left
                ? startPt_1.x
                : Math.abs(eventRect.right - targetRect.left) <
                    Math.abs(eventRect.right - targetRect.right)
                    ? targetRect.left
                    : targetRect.right;
            var dx = endPtX - startPt_1.x;
            var endPt_1 = {
                x: endPtX,
                y: dx < 0
                    ? targetRect.top
                    : startPt_1.y < targetRect.bottom && startPt_1.y > targetRect.top
                        ? startPt_1.y
                        : Math.abs(eventContainerRect.bottom - targetRect.top) <
                            Math.abs(eventContainerRect.bottom - targetRect.bottom)
                            ? targetRect.top
                            : targetRect.bottom
            };
            var dy = endPt_1.y - startPt_1.y;
            if (endPt_1.y === targetRect.top) {
                endPt_1.y -= borderOffset;
                endSide = 'top';
                if (endPt_1.x === targetRect.right) {
                    endPt_1.x -= magic;
                }
                else if (endPt_1.x === targetRect.left) {
                    endPt_1.x += magic;
                }
            }
            else if (endPt_1.y === targetRect.bottom) {
                endPt_1.y += borderOffset;
                endSide = 'bottom';
                if (endPt_1.x === targetRect.right) {
                    endPt_1.x -= magic;
                }
                else if (endPt_1.x === targetRect.left) {
                    endPt_1.x += magic;
                }
            }
            else {
                if (endPt_1.x === targetRect.right) {
                    endPt_1.y = targetRect.top;
                    endSide = 'top';
                }
                else {
                    endPt_1.x -= borderOffset;
                    endSide = 'left';
                }
            }
            var slope = dy / dx;
            var xDir_1 = Math.sign(dx);
            var yDir = Math.sign(dy);
            ptFns.push(function () { return startPt_1; });
            if (xDir_1 === -1) {
                if (yDir === -1) {
                    ptFns.push(function (prevPt) { return ({
                        x: prevPt.x,
                        y: Math.min(sourceRect.top - magic, targetRect.top - magic)
                    }); });
                }
                else {
                    // ptFns.push(prevPt => ({
                    //   x: prevPt.x,
                    //   y: Math.max(
                    //     startPt.y + magic,
                    //     sourceRect.bottom,
                    //     eventContainerRect.bottom
                    //   )
                    // }));
                    if (sourceRect.bottom > startPt_1.y + magic) {
                        ptFns.push(function (prevPt) { return ({
                            x: prevPt.x,
                            y: Math.min(sourceRect.bottom + magic, endPt_1.y - magic)
                        }); });
                        ptFns.push(function (prevPt) { return ({
                            x: prevPt.x + magic * xDir_1,
                            y: prevPt.y
                        }); });
                    }
                    else {
                        ptFns.push(function (prevPt) { return ({
                            x: prevPt.x,
                            y: Math.min(eventContainerRect.bottom + magic, endPt_1.y - magic)
                        }); });
                    }
                }
            }
            if (endSide === 'top') {
                ptFns.push(function () { return ({
                    x: endPt_1.x,
                    y: endPt_1.y - magic
                }); });
            }
            else if (endSide === 'bottom') {
                ptFns.push(function () { return ({
                    x: endPt_1.x,
                    y: endPt_1.y + magic
                }); });
            }
            ptFns.push(function () { return endPt_1; }, function () { return endPt_1; });
        }
        var pts = ptFns.reduce(function (acc, ptFn, i) {
            acc.push(ptFn(acc[i - 1] || acc[0]));
            return acc;
        }, []);
        var circles = pts.slice();
        var path = pts.reduce(function (acc, point, i) {
            if (i === 0) {
                return "M " + point.x + "," + point.y;
            }
            if (i === pts.length - 1) {
                return acc;
            }
            var prevPoint = pts[i - 1];
            var nextPoint = pts[i + 1];
            var dx = point.x - prevPoint.x;
            var dy = point.y - prevPoint.y;
            var nextDx = nextPoint.x - point.x;
            var nextDy = nextPoint.y - point.y;
            var midpoint1 = {
                x: prevPoint.x + dx / 2,
                y: prevPoint.y + dy / 2
            };
            var midpoint2 = {
                x: point.x + nextDx / 2,
                y: point.y + nextDy / 2
            };
            circles.push(midpoint1, midpoint2);
            return (
            // acc + `L ${midpoint1.x},${midpoint1.y} L ${midpoint2.x},${midpoint2.y}`
            acc +
                ("L " + midpoint1.x + "," + midpoint1.y + " Q " + point.x + "," + point.y + " " + midpoint2.x + "," + midpoint2.y + " "));
        }, '');
        var isHighlighted = this.props.preview;
        return (React.createElement("g", null,
            React.createElement("path", { d: path, stroke: isHighlighted ? 'var(--color-edge-active)' : 'var(--color-edge)', strokeWidth: strokeWidth, fill: "none", markerEnd: isHighlighted ? "url(#marker-preview)" : "url(#marker)", ref: this.ref }),
            process.env.NODE_ENV === 'development'
                ? circles.map(function (circle, i) {
                    var fill = i > pts.length ? 'red' : 'blue';
                    return (React.createElement("circle", { key: i, cx: circle.x, cy: circle.y, r: i > pts.length ? 0.5 : 1, fill: circle.color || fill },
                        React.createElement("text", null, i)));
                })
                : null));
    };
    return Edge;
}(Component));
export { Edge };
