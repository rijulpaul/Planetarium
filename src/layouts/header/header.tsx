import './header.css'
import { useState, useEffect } from 'react'

export default function Header() {
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000) // Update every second

        return () => clearInterval(timer)
    }, [])

    return <header className='header'>
        <div className="header-content">
            <span>Planetarium</span>
            <div className="time-indicator">
                <span>{currentTime.toLocaleString().replaceAll('/','-').replace(',',' |')}</span>
            </div>
        </div>
    </header>
}
