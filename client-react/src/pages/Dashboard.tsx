import { type JSX, createContext } from 'react'
import RallyList from '../components/RallyList'
import useFetch, { type UseFetchState } from '../hooks/useFetch'
import type { Rally } from '../types'

export const RallyContext = createContext<UseFetchState<Rally[]>>({
    response: null,
    isLoading: false,
    error: null
})

export default function Dashboard(): JSX.Element {
    const RallyState = useFetch<Rally[]>("/api/rally")

    return (
        <RallyContext value={ RallyState }>
            <h1>Dashboard</h1>
            <RallyList />
        </RallyContext>
    )
}