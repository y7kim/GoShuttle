import { type JSX, useState, useEffect } from 'react'
import type { Rally } from '../types'
import { getRallies } from '../api'

export default function RallyList(): JSX.Element {
    const [rallies, setRallies] = useState<Rally[]>([])

    useEffect(() => {
        async function loadRallies(): Promise<void> {
            try {
                const rallies: Rally[] = await getRallies();
                setRallies(rallies)
            } catch (error) {
                console.log(error)
            }
        }
        loadRallies()
    }, [])

    return (
        <>
            <div className='rally-list'>
            {
                rallies.map(rally => (
                    <div key={rally._id} className='rally-tile'>
                        <div className='rally-info'>
                            <div>{rally.username}</div>
                            <div>{rally.skillLevel}</div>
                        </div>
                    </div>
                ))
            }
            </div>
        </>
    )
}