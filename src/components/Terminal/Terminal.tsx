/*     import { Terminal } from "xterm"
    import { FitAddon } from "xterm-addon-fit"
    import { WebglAddon } from "xterm-addon-webgl"

    import { Child, Command } from "@tauri-apps/api/shell"

    import daisyuiColors from "daisyui/src/colors/themes"
    import { themeStore } from "../Stores"

    import "xterm/css/xterm.css"

    const command = new Command("powershell")

    command.stderr.on("data", (data) => console.log(data))

    let childProcess: Child

    let term: Terminal
    let fitAddon: FitAddon
    let glAddon: WebglAddon
    let terminalElement: HTMLDivElement

    function handleTermResize() {
        fitAddon.fit()
    }

    function setTermTheme(term: Terminal) {
        term.options.theme = {
            background:
                daisyuiColors[`[data-theme=${$themeStore}]`]["base-100"],
            foreground:
                daisyuiColors[`[data-theme=${$themeStore}]`]["base-content"],
            cursor: daisyuiColors[`[data-theme=${$themeStore}]`][
                "base-content"
            ],
            selectionBackground:
                daisyuiColors[`[data-theme=${$themeStore}]`]["neutral"],
            selectionForeground:
                daisyuiColors[`[data-theme=${$themeStore}]`]["neutral-content"]
        }
    }

    onMount(async () => {
        term = new Terminal({
            cursorStyle: "bar",
            cursorBlink: true,
            altClickMovesCursor: true
        })

        setTermTheme(term)

        fitAddon = new FitAddon()
        term.loadAddon(fitAddon)

        glAddon = new WebglAddon()
        glAddon.onContextLoss(() => {
            glAddon.dispose()
        })
        term.loadAddon(glAddon)

        term.open(terminalElement)

        fitAddon.fit()

        childProcess = await command.spawn()

        term.onData((data) => {
            console.log(data)
        })

        term.onKey(async (event) => {
            if (event.domEvent.key === "Enter") {
                term.write("\r\n")
                await childProcess.write("\n")
            } else if (event.domEvent.key === "Backspace") {
                term.write("\b \b")
                await childProcess.write("\b \b")
            } else {
                term.write(event.domEvent.key)
                await childProcess.write(event.domEvent.key)
            }
        })

        themeStore.subscribe(() => {
            setTermTheme(term)
        })
    }) */

export default function Terminal() {
    return <div class="rounded-lg shadow-lg bg-base-100 overflow-hidden" />
}
