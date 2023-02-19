import { readTextFile } from "@tauri-apps/api/fs"
import { codeStorage, pathStorage } from "../Storages"

import { materialLight } from "@uiw/codemirror-themes-all"

import { javascript } from "@codemirror/lang-javascript"

/* import daisyuiColors from "daisyui/src/colors/themes" */

import {
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    completionKeymap
} from "@codemirror/autocomplete"

import { history, historyKeymap, indentWithTab } from "@codemirror/commands"

import { bracketMatching, indentOnInput } from "@codemirror/language"

import { EditorState, Extension } from "@codemirror/state"

import {
    crosshairCursor,
    drawSelection,
    dropCursor,
    highlightSpecialChars,
    keymap,
    lineNumbers,
    rectangularSelection
} from "@codemirror/view"

import { createCodeMirror, createEditorControlledValue } from "solid-codemirror"
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap"
import { createEffect } from "solid-js"
import { saveFile } from "../../functions/FileOperations"

const baseSetup: Extension = [
    highlightSpecialChars(),
    lineNumbers(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    rectangularSelection(),
    crosshairCursor(),
    history(),
    keymap.of([
        ...closeBracketsKeymap,
        ...vscodeKeymap,
        ...completionKeymap,
        ...historyKeymap,
        {
            key: "Ctrl-s",
            run: () => {
                saveFile()
                return true
            }
        },
        indentWithTab
    ])
]

export default function CodeEditor() {
    const { currentCode, setCode } = codeStorage
    const { currentPath } = pathStorage

    const {
        editorView,
        ref: editorRef,
        createExtension
    } = createCodeMirror({
        onValueChange: setCode
    })
    createEditorControlledValue(editorView, currentCode)

    createExtension(materialLight)
    createExtension(javascript({ jsx: true, typescript: true }))
    createExtension(baseSetup)

    createEffect(async () => {
        setCode(await readTextFile(currentPath()))
    })

    return (
        <div class="rounded-lg shadow-lg bg-base-100 overflow-hidden ">
            <div class="scrollbar" ref={editorRef} />
        </div>
    )
}
