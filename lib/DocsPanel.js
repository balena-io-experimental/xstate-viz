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
import React from 'react';
import styled from 'styled-components';
import { parseMarkdown } from './markdown';
var StyledField = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  &:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n\n  margin-top: 0.5rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n  }\n\n  &[data-empty] {\n    opacity: 0.5;\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"], ["\n  &:not(:last-child) {\n    margin-bottom: 1rem;\n  }\n\n  margin-top: 0.5rem;\n  width: 100%;\n  overflow: hidden;\n\n  > label {\n    text-transform: uppercase;\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n  }\n\n  &[data-empty] {\n    opacity: 0.5;\n    > label {\n      margin-bottom: 0;\n    }\n  }\n"])));
var StyledDocs = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n    font-size: 12.8px;\n  }\n\n  > h1 {\n    text-decoration: underline;\n  }\n\n  > h3 {\n    font-size: 12px;\n    font-style: italic;\n  }\n\n  > h4 {\n    font-size: 12px;\n    font-weight: 500;\n    font-style: italic;\n  }\n\n  > h5 {\n    font-weight: 500;\n    font-style: italic;\n    font-size: 11.2px;\n  }\n\n  > h6 {\n    font-weight: 500;\n    font-size: 11.2px;\n  }\n\n  > p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre {\n    font-size: 11.2px;\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  a {\n    color: var(--color-link)\n    text-decoration: none;\n  }\n"], ["\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > h1,\n  h2,\n  h3,\n  h4,\n  h5,\n  h6 {\n    display: block;\n    margin-bottom: 0.5em;\n    font-weight: bold;\n    opacity: 0.5;\n    font-size: 12.8px;\n  }\n\n  > h1 {\n    text-decoration: underline;\n  }\n\n  > h3 {\n    font-size: 12px;\n    font-style: italic;\n  }\n\n  > h4 {\n    font-size: 12px;\n    font-weight: 500;\n    font-style: italic;\n  }\n\n  > h5 {\n    font-weight: 500;\n    font-style: italic;\n    font-size: 11.2px;\n  }\n\n  > h6 {\n    font-weight: 500;\n    font-size: 11.2px;\n  }\n\n  > p,\n  blockquote,\n  ul,\n  ol,\n  dl,\n  table,\n  pre {\n    font-size: 11.2px;\n    margin-top: 0;\n    margin-bottom: 10px;\n  }\n\n  a {\n    color: var(--color-link)\n    text-decoration: none;\n  }\n"])));
function Field(_a) {
    var label = _a.label, children = _a.children, disabled = _a.disabled, style = _a.style;
    return (React.createElement(StyledField, { style: __assign(__assign({}, style), (disabled ? { opacity: 0.5 } : undefined)), "data-empty": !children || undefined },
        React.createElement("label", null, label),
        children));
}
var StyledDetails = styled.details(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0 1rem;\n\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > summary {\n    font-weight: bold;\n    font-size: 1rem;\n  }\n"], ["\n  margin: 0;\n  padding: 0 1rem;\n\n  & & {\n    border-left: 2px solid #737373;\n  }\n\n  > summary {\n    font-weight: bold;\n    font-size: 1rem;\n  }\n"])));
function mergeDocs(meta) {
    var docs = Object.keys(meta)
        .sort()
        .reduce(function (map, key) {
        var _a;
        var entry = meta[key];
        // if meta entry has documentation
        if (entry.description) {
            // generate titles from state hierarchy
            key.split('.').reduce(function (parent, child, index) {
                var id = [parent, child].join('.');
                var title = id === key && entry.title
                    ? entry.title
                    : child.charAt(0).toUpperCase() + child.slice(1);
                if (!map.has(id)) {
                    map.set(id, ['#'.repeat(index + 1) + ' ' + title]);
                }
                return id;
            });
            if (!map.has(key)) {
                map.set(key, []);
            }
            // append documentation body
            (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(entry.description);
        }
        return map;
    }, new Map());
    if (docs.size === 0) {
        return 'No documentation has been provided for this chart';
    }
    return Array.from(docs)
        .map(function (_a) {
        var _ = _a[0], value = _a[1];
        return value.join('\n\n');
    })
        .join('\n\n');
}
export var DocsPanel = function (_a) {
    var state = _a.state, service = _a.service;
    var markdown = mergeDocs(state.meta);
    return (React.createElement(StyledDetails, { key: service.id, open: true },
        React.createElement("summary", null, service.id),
        React.createElement(Field, { label: "description" },
            React.createElement(StyledDocs, { dangerouslySetInnerHTML: {
                    __html: parseMarkdown(markdown)
                } })),
        React.createElement(Field, { label: "Children" }, Array.from(service.children.values()).map(function (child, i) {
            if (!child.state) {
                return null;
            }
            return React.createElement(DocsPanel, { state: child.state, service: child, key: i });
        }))));
};
var templateObject_1, templateObject_2, templateObject_3;
