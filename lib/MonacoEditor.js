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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import React, { useRef, useEffect } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { KeyCode, KeyMod } from "monaco-editor";
import { format } from "prettier/standalone";
import tsParser from "prettier/parser-typescript";
import * as ts from "typescript";
import { hashString } from "./utils";
// TODO: use this to implement undo (CMD + Z) in the editor
var UNDO_TRACKER = 4;
var lscache = {
    __store: new Map(),
    get: function (key) {
        var data = this.__store.get(key);
        return data || null;
    },
    set: function (key, value) {
        var keys = Array.from(this.__store.keys());
        while (this.__store.size >= UNDO_TRACKER) {
            // Remove from top (FIFO)
            this.__store.delete(keys[0]);
        }
        this.__store.set(key, value);
    }
};
function prettify(code) {
    return format(code, {
        parser: "typescript",
        plugins: [tsParser]
    });
}
export function MonacoEditor(props) {
    var editorRef = useRef(null);
    /**
     * In case editor is controlled in future, this needs to be changed to `useLayoutEffect`
     * to avoid stale values considering React batches state updates and effect execution
     */
    useEffect(function () {
        var e_1, _a;
        var value = props.value, onChange = props.onChange, _b = props.registerEditorActions, registerEditorActions = _b === void 0 ? [] : _b;
        var definitions = props.definitions;
        try {
            // Register definition files in the lib registry
            for (var definitions_1 = __values(definitions), definitions_1_1 = definitions_1.next(); !definitions_1_1.done; definitions_1_1 = definitions_1.next()) {
                var file = definitions_1_1.value;
                var fakePath = "file:///node_modules/@types/xstate/" + file.fileName;
                monaco.languages.typescript.typescriptDefaults.addExtraLib(file.content, fakePath);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (definitions_1_1 && !definitions_1_1.done && (_a = definitions_1.return)) _a.call(definitions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Expose required methods from xstate to globals in order to avoid users from using scoped methods.
        monaco.languages.typescript.typescriptDefaults.addExtraLib("\n          import * as _XState from \"xstate\";\n\n          declare global {\n            var XState: typeof _XState;\n            var Machine: typeof _XState.Machine;\n            var assign: typeof _XState.assign;\n            var spawn: typeof _XState.spawn;\n            var send: typeof _XState.send;\n            var sendParent: typeof _XState.sendParent;\n            var matchState: typeof _XState.matchState;\n          }\n        ", "file:///global.d.ts");
        // Restore TS source from the cache if it's available
        var modelValue = lscache.get(hashString(value)) || value;
        var model = monaco.editor.createModel(modelValue, "typescript", monaco.Uri.parse("file:///main.tsx"));
        var editor = monaco.editor.create(editorRef.current, {
            language: "typescript",
            minimap: { enabled: false },
            lineNumbers: "off",
            scrollBeyondLastLine: false,
            theme: "vs-dark",
            wordWrap: "bounded",
            readOnly: !onChange,
            fontSize: 12,
            fixedOverflowWidgets: true,
            model: model
        });
        // Register CTRL+S (CMD + S) to run format action
        editor.addAction({
            id: "run-prettier",
            label: "Run Prettier",
            keybindings: [KeyMod.CtrlCmd | KeyCode.KEY_S],
            run: function (ed) {
                ed.getAction("editor.action.formatDocument").run();
            }
        });
        // Register custom actins passed to the editor
        registerEditorActions.forEach(function (action) {
            editor.addAction(__assign(__assign({}, action), { run: function (ed) {
                    action.run(ts.transpileModule(ed.getValue(), {}).outputText);
                } }));
        });
        // Register formatting action using Prettier
        monaco.languages.registerDocumentFormattingEditProvider("typescript", {
            provideDocumentFormattingEdits: function (model) {
                try {
                    return [
                        {
                            text: prettify(editor.getValue()),
                            range: model.getFullModelRange()
                        }
                    ];
                }
                catch (err) {
                    console.warn(err);
                }
            }
        });
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            allowJs: false,
            typeRoots: ["node_modules/@types"],
            target: monaco.languages.typescript.ScriptTarget.ES2016,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true
        });
        // Run format on initial code
        editor.getAction("editor.action.formatDocument").run();
        // Subscribe to editor model content change
        var subscription = editor.onDidChangeModelContent(function () {
            var editorValue = editor.getValue();
            var output = ts.transpileModule(editorValue, {});
            lscache.set(hashString(output.outputText), editorValue);
            props.onChange(output.outputText);
        });
        return function () {
            if (editor) {
                editor.getModel().dispose();
                editor.dispose();
            }
            if (subscription) {
                subscription.dispose();
            }
        };
    }, []);
    return (React.createElement("div", { style: { height: props.height || "100%", width: "100%" }, ref: editorRef }));
}
MonacoEditor.KeyCode = KeyCode;
MonacoEditor.KeyMod = KeyMod;
