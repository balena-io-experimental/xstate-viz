import React from 'react';
import { Editor } from './Editor';
export var CodePanel = function (_a) {
    var code = _a.code, onChange = _a.onChange, onSave = _a.onSave;
    return React.createElement(Editor, { code: code, onChange: onChange, onSave: onSave });
};
