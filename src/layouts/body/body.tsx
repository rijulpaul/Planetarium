import { useState } from "react";

import Sidemenu from "../sidemenu/sidemenu";
import Space from "../space/space";

import planetData from "../../utils/planetData";

import "./body.css"

export default function Body() {
    const [currPlanetData, editCurrPlanetData] = useState(planetData);

    return (
    <div className="body">
        <Sidemenu planets={currPlanetData} planetEditor={editCurrPlanetData}/>
        <Space planets={currPlanetData}/>
    </div>
    )
}
