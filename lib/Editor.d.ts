import React from 'react';
import { AceEditorProps } from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
interface EditorProps extends AceEditorProps {
    code: string;
    onChange: (code: string) => void;
    onSave: (code: string) => void;
    height?: string;
    changeText?: string;
    mode?: string;
}
export declare const StyledEditor: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const StyledButtons: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Editor: React.FunctionComponent<EditorProps>;
export {};
