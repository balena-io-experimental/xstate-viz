import React from 'react';
interface CodePanelProps {
    code: string;
    onChange: (code: string) => void;
    onSave: (code: string) => void;
}
export declare const CodePanel: React.FunctionComponent<CodePanelProps>;
export {};
