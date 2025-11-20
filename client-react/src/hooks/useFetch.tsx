import { useReducer, useEffect } from 'react'

const ActionTypes = {
    Start: "START",
    Success: "SUCCESS",
    Error: "ERROR"
} as const;

export interface UseFetchState<ResponseType> {
    response: ResponseType | null,
    isLoading: boolean,
    error: Error | null
}

interface UseFetchAction<ResponseType> {
    type: typeof ActionTypes.Start | typeof ActionTypes.Success | typeof ActionTypes.Error,
    payload?: ResponseType | Error
}

function fetchReducer<ResponseType>(
    state: UseFetchState<ResponseType>,
    { type, payload }: UseFetchAction<ResponseType>
): UseFetchState<ResponseType> {
    switch (type) {
        case ActionTypes.Start:
            return {
                ...state,
                isLoading: true
            }
        case ActionTypes.Success:
            return {
                ...state,
                response: payload as ResponseType,
                isLoading: false
            }
        case ActionTypes.Error:
            return {
                ...state,
                error: payload as Error,
                isLoading: false
            }
    }
    return state;
}

export default function useFetch<ResponseType>(url: string): UseFetchState<ResponseType> {

    const initialState: UseFetchState<ResponseType> = {
        response: null,
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(fetchReducer<ResponseType>, initialState)

    useEffect(() => {
        if (!url) return

        (async () => {
            dispatch({
                type: ActionTypes.Start
            })

            try {
                const res: Response = await fetch(url)
                if (!res.ok) throw new Error(`Error fetch from ${url}`)

                const data: ResponseType = await res.json()
                dispatch({
                    type: ActionTypes.Success,
                    payload: data
                })
            } catch (e) {
                dispatch({
                    type: ActionTypes.Error,
                    payload: e as Error
                })
            }
        })()
    }, [url])

    return state
}