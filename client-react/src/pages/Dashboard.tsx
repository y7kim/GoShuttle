import type { JSX } from 'react'
import RallyList from '../components/RallyList'

export default function Dashboard(): JSX.Element {
    return (
        <>
            <h1>Dashboard</h1>
            <RallyList />
        </>
    )
}