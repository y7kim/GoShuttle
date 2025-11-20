import { type JSX, useContext } from 'react'
import { RallyContext } from '../pages/Dashboard'

export default function RallyList(): JSX.Element {
    const { response: rallies, isLoading } = useContext(RallyContext)

    return (
        <>
            <div>{isLoading}</div>
            {!isLoading ? (
                <div className='rally-list'>
            {
                rallies && rallies.map(rally => (
                    <div key={rally._id} className='rally-tile'>
                        <div className='rally-info'>
                            <div>{rally.username}</div>
                            <div>{rally.skillLevel}</div>
                        </div>
                    </div>
                ))
            }
            </div>
            ) : <h3>Loading...</h3>}
        </>
    )
}