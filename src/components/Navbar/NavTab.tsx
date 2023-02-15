import { children, JSX } from "solid-js"

type NavTabProps = {
    label: string
    children: JSX.Element | JSX.Element[]
}

export default function NavTab(props: NavTabProps) {
    const child = children(() => props.children)

    return (
        <div class="dropdown">
            <button class="btn btn-ghost btn-xs m-1">{props.label}</button>
            <ul class="dropdown-content menu menu-compact p-2 shadow-md bg-base-100 rounded-box w-40">
                {child()}
            </ul>
        </div>
    )
}
