import { useEffect, useState } from "react";

import "./sidemenu.css"
import icon from "../../../public/edit.svg"
import presets from "../../utils/planetPresets"

import Slider from "@mui/material/Slider"

export default function Sidemenu({planets, planetEditor}) {

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <div className={"sidebar "+"sidebar-"+ (openMenu ? "open" : "close")}>
      <div className="sidebar-common-presets">
        {/* <div className="sidebar-common-presets-item">
          <span>Show Orbit Path</span>
          <input type="checkbox" checked={presets.showOrbitPath} onChange={()=>setShowOrbitPath(!presets.showOrbitPath)}/>
        </div>
        <div className="sidebar-common-presets-item">
          <span>Show Planet Label</span>
          <input type="checkbox" checked={presets.showPlanetLabel} onChange={()=>setShowPlanetLabel(!presets.showPlanetLabel)}/>
        </div>
        <div className="sidebar-common-presets-item">
          <span>Rotation Scale</span>
          <input type="number" value={presets.rotationScale} onChange={(e)=>setRotationScale(e.target.value)}/>
        </div>
        <div className="sidebar-common-presets-item">
          <span>Distance Scale</span>
          <input type="number" value={presets.distanceScale} onChange={(e)=>setDistanceScale(e.target.value)}/>
        </div>
        <div className="sidebar-common-presets-item">
          <span>Size Scale</span>
          <input type="number" value={presets.sizeScale} onChange={(e)=>setSizeScale(e.target.value)}/>
        </div>
        <div className="sidebar-common-presets-item">
          <span>Time Scale</span>
          <input type="number" value={presets.timeScale} onChange={(e)=>setTimeScale(e.target.value)}/>
        </div> */}
      </div>
      <div className="sidebar-planet-presets">
      
      </div>
      <div className="sidebar-toggle-button" onClick={()=>setOpenMenu(openMenu => !openMenu)}>
        <img className="sidemenu-icon" src={icon}/>
      </div>
    </div>
  )
}
