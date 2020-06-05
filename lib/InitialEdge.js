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
import React from 'react';
import { tracker } from './tracker';
import { relative } from './utils';
var InitialEdge = /** @class */ (function (_super) {
    __extends(InitialEdge, _super);
    function InitialEdge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            sourceElement: undefined
        };
        return _this;
    }
    InitialEdge.prototype.componentDidMount = function () {
        var _this = this;
        var id = this.props.source.id;
        tracker.listen(id, function (data) {
            _this.setState({ sourceElement: data.element });
        });
    };
    InitialEdge.prototype.render = function () {
        var _a = this.props, svgRef = _a.svgRef, preview = _a.preview;
        if (!this.state.sourceElement) {
            return null;
        }
        var rect = relative(this.state.sourceElement.getBoundingClientRect(), svgRef);
        var top = rect.top, left = rect.left;
        var stroke = preview ? 'var(--color-edge-active)' : 'var(--color-edge)';
        return (React.createElement("g", null,
            React.createElement("circle", { r: "4", cx: left - 10, cy: top, fill: stroke }),
            React.createElement("path", { d: "M " + (left - 10) + "," + top + " Q " + (left - 10) + "," + (top + 10) + " " + (left -
                    1) + "," + (top + 10) + " L " + left + "," + (top + 10), stroke: stroke, strokeWidth: "2", fill: "none", markerEnd: preview ? "url(#marker-preview)" : "url(#marker)" })));
    };
    return InitialEdge;
}(React.Component));
export { InitialEdge };
