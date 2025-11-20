import type { Rally } from "./types"

export async function getRallies(): Promise<Rally[]> {
    const res: Response = await fetch("/api/rally")

    if (!res.ok) {
        throw {
            message: "Failed to fetch rallies",
            statusText: res.statusText,
            status: res.status
        }
    }

    const rallies: Rally[] = await res.json()
    return rallies
}