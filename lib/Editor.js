var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useState, useContext } from 'react';
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import { StyledButton } from './Button';
import styled from 'styled-components';
import { AppContext } from './App';
export var StyledEditor = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem;\n"], ["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 1rem;\n"])));
export var StyledButtons = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-column-gap: 1rem;\n"], ["\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  grid-column-gap: 1rem;\n"])));
export var Editor = function (props) {
    var _a = useState(props.code), code = _a[0], setCode = _a[1];
    var state = useContext(AppContext).state;
    var onChange = props.onChange, onSave = props.onSave, _b = props.height, height = _b === void 0 ? '100%' : _b, _c = props.changeText, changeText = _c === void 0 ? 'Update' : _c, _d = props.mode, mode = _d === void 0 ? 'javascript' : _d;
    var isSaving = state.matches({
        auth: { authorized: { gist: 'patching' } }
    }) ||
        state.matches({
            auth: { authorized: { gist: 'posting' } }
        });
    return (React.createElement(StyledEditor, null,
        React.createElement(AceEditor, { mode: mode, theme: "monokai", editorProps: { $blockScrolling: true }, value: code, onChange: function (value) { return setCode(value); }, setOptions: { tabSize: 2, fontSize: '12px' }, width: "100%", height: height, showGutter: false, readOnly: !onChange, wrapEnabled: true }),
        React.createElement(StyledButtons, null,
            React.createElement(StyledButton, { "data-variant": "secondary", disabled: isSaving, onClick: function () { return onChange(code); } }, changeText),
            React.createElement(StyledButton, { "data-variant": "primary", disabled: isSaving || state.matches({ auth: 'pendingAuthorization' }), onClick: function () {
                    onChange(code);
                    onSave(code);
                } }, state.matches({
                auth: { authorized: { gist: 'patching' } }
            })
                ? 'Saving...'
                : state.matches({
                    auth: { authorized: { gist: 'posting' } }
                })
                    ? 'Uploading...'
                    : state.matches({
                        auth: { authorized: { gist: { idle: 'patched' } } }
                    })
                        ? 'Saved!'
                        : state.matches({
                            auth: { authorized: { gist: { idle: 'posted' } } }
                        })
                            ? 'Uploaded!'
                            : state.matches({ auth: 'authorized' })
                                ? 'Save'
                                : !state.matches({ auth: 'authorized' }) &&
                                    !state.matches({ auth: 'unauthorized' })
                                    ? 'Logging in...'
                                    : 'Login to save'))));
};
var templateObject_1, templateObject_2;
