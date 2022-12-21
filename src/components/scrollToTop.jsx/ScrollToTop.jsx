import './scrollToTop.css'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [showBtnGoToTop, setShowBtnGoToTop] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setShowBtnGoToTop(window.scrollY >= 200)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleBtnGoToTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div 
            className={showBtnGoToTop ? "scroll-to-top show" : "scroll-to-top"}
            onClick={handleBtnGoToTop}
        >
            <i className="far fa-arrow-alt-circle-up"></i>
        </div>
    )
}
