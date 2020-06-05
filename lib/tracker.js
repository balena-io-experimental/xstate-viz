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
import { isHidden } from './utils';
var Tracker = /** @class */ (function () {
    function Tracker() {
        var _this = this;
        this.elements = new Map();
        if (typeof window !== 'undefined') {
            var timeout_1;
            window.addEventListener('resize', function () {
                if (timeout_1) {
                    cancelAnimationFrame(timeout_1);
                }
                timeout_1 = requestAnimationFrame(function () {
                    _this.updateAll();
                });
            });
        }
    }
    Tracker.prototype.updateAll = function () {
        var _this = this;
        Array.from(this.elements.keys()).forEach(function (key) {
            _this.update(key, _this.elements.get(key).element);
        });
    };
    Tracker.prototype.update = function (id, element) {
        var _this = this;
        if (!this.elements.get(id)) {
            this.elements.set(id, {
                listeners: new Set(),
                element: element || undefined,
                rect: element ? element.getBoundingClientRect() : undefined,
                hidden: isHidden(element)
            });
        }
        var data = __assign(__assign({}, this.elements.get(id)), { element: element || undefined, rect: element ? element.getBoundingClientRect() : undefined, hidden: isHidden(element) });
        this.notify(data);
        if (element) {
            var desc = element.querySelectorAll("[data-id]");
            Array.from(desc).forEach(function (el) {
                var id = el.getAttribute("data-id");
                _this.update(id, el);
            });
        }
    };
    Tracker.prototype.listen = function (id, listener) {
        if (!this.elements.get(id)) {
            this.elements.set(id, {
                listeners: new Set(),
                element: undefined,
                rect: undefined,
                hidden: true
            });
        }
        var data = this.elements.get(id);
        data.listeners.add(listener);
        this.notify(data);
    };
    Tracker.prototype.get = function (id) {
        if (this.elements.get(id)) {
            return this.elements.get(id);
        }
        return undefined;
    };
    Tracker.prototype.notify = function (data) {
        data.listeners.forEach(function (listener) {
            listener(data);
        });
    };
    return Tracker;
}());
var tracker = new Tracker();
export { tracker };
