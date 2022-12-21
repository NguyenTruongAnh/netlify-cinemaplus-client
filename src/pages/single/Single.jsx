import SingleMovie from '../../components/singleMovie/SingleMovie'
import './single.css'

import { useEffect } from 'react'

export default function Single() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className="single">
            <div className="grid wide">
                <SingleMovie />
            </div>
        </div>
    )
}
