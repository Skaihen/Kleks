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

import { createCodeMirror } from "solid-codemirror"
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap"

/*     pathStore.subscribe(async (value) => {
        try {
            codeStore.set(await readTextFile(value))
        } catch (error) {
            console.log(error)
        }
    }) */

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
        indentWithTab
    ])
]

export default function CodeEditor() {
    const { currentCode, setCode } = codeStorage

    const { ref: editorRef, createExtension } = createCodeMirror({
        value: currentCode(),
        onValueChange: setCode
    })

    createExtension(materialLight)
    createExtension(javascript({ jsx: true, typescript: true }))
    createExtension(baseSetup)

    return (
        <div class="rounded-lg shadow-lg bg-base-100 overflow-hidden ">
            <div class="scrollbar" ref={editorRef} />
        </div>
    )
}
/* <CodeMirror
    bind:value={$codeStore}
    extensions={[
        keymap.of(defaultKeymap),
        keymap.of([
            {
                key: "Ctrl-s",
                run: () => {
                    saveFile()
                    return true
                }
            }
        ])
    ]}
    lang={svelte()}
    theme={dracula}
    tabSize={4}
    class="scrollbar"
/> */
