/// <reference types="react" />
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
declare type Def = {
    fileName: string;
    content: string;
};
declare type EditorAction = Omit<monaco.editor.IActionDescriptor, "run"> & {
    run: (value: string) => void;
};
declare type MonacoEditorProps = {
    value: string;
    onChange: (code: string) => void;
    definitions: Def[] | undefined;
    height?: string;
    mode?: string;
    registerEditorActions?: EditorAction[];
};
export declare function MonacoEditor(props: MonacoEditorProps): JSX.Element;
export declare namespace MonacoEditor {
    var KeyCode: typeof monaco.KeyCode;
    var KeyMod: typeof monaco.KeyMod;
}
export {};
