import { darkThemeList, lightThemeList } from "../../themes/themeList"

import { themeStorage } from "../../Storages"
import { For } from "solid-js"

export default function ThemeSubTab() {
    const { currentTheme, changeTheme } = themeStorage

    return (
        <>
            <li class="menu-title">
                <span>Dark Themes</span>
            </li>

            <For each={darkThemeList}>
                {(darkTheme) => (
                    <li>
                        <button
                            class={darkTheme === currentTheme() ? "active" : ""}
                            onClick={() => changeTheme(darkTheme)}
                        >
                            {darkTheme.charAt(0).toUpperCase() +
                                darkTheme.slice(1)}
                        </button>
                    </li>
                )}
            </For>

            <li class="menu-title mt-2">
                <span>Light Themes</span>
            </li>

            <For each={lightThemeList}>
                {(lightTheme) => (
                    <li>
                        <button
                            class={
                                lightTheme === currentTheme() ? "active" : ""
                            }
                            onClick={() => changeTheme(lightTheme)}
                        >
                            {lightTheme.charAt(0).toUpperCase() +
                                lightTheme.slice(1)}
                        </button>
                    </li>
                )}
            </For>
        </>
    )
}
