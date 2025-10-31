import { useState } from "react";

import Sidemenu from "../sidemenu/sidemenu";
import Space from "../space/space";
import TimeSlider from "../timeSlider/timeSlider";

import planetData from "../../utils/planetData";

import "./main.css"

export default function Main() {
    const [currPlanetData, editCurrPlanetData] = useState(planetData);

    return (
    <main className="main">
        <Sidemenu planets={currPlanetData} planetEditor={editCurrPlanetData}/>
        <Space planets={currPlanetData}/>
        <TimeSlider/>
    </main>
    )
}
