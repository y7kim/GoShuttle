import type { JSX } from 'react'
import { Outlet } from 'react-router'

export default function Layout(): JSX.Element {
    return (
        <>
            <header>
                Header
            </header>
            <Outlet />
        </>
    )
}