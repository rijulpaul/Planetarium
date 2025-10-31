import './header.css'
import { useTime } from '../../store/useTime'

export default function Header() {
    const getTime = useTime(state=>state.time)

    const [date, time] = new Date(getTime)
        .toLocaleString()
        .replaceAll('/', '-')
        .replace(',', ' |')
        .split("|")
        .map(s => s.trim())
    
    const parts = date.split("-");
    parts[1] = parts[1].padStart(2, "0");
    const formattedDate = parts.join("-");


    return <header className='header'>
        <div className="header-content">
            <span>Planetarium</span>
            <div className="time-indicator">
                <span>{formattedDate}</span>
                <span>{time}</span>
            </div>
        </div>
    </header>
}
