import Space from "../space/space";
import TimeSlider from "../timeSlider/timeSlider";
import Sidemenu from "../sidemenu/sidemenu";

import "./main.css"

export default function Main() {

    return (
    <main className="main">
        <Space/>
        <Sidemenu/>
        <TimeSlider/>
    </main>
    )
}
