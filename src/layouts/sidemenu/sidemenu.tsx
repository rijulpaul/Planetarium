import { useMemo, useState } from "react";

import "./sidemenu.css"
import icon from "../../../public/edit.svg"
import usePlanetData from "../../store/usePlanetData";
import type { OrbitalElements } from "../../utils/planetData";

export default function Sidemenu() {

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const planets = usePlanetData((s)=>s.planets)
  const updateOrbitalElements = usePlanetData((s)=>s.updateOrbitalElements)
  const planetKeys = useMemo(()=>Object.keys(planets), [planets])
  const [selected, setSelected] = useState<string>(()=>planetKeys.find(k=>k!=="sun") ?? planetKeys[0] ?? "")

  const elements: OrbitalElements | null = planets[selected]?.orbitalElements ?? null

  function handleNumberChange(field: keyof OrbitalElements, raw: string) {
    if (!elements) return;
    const value = parseFloat(raw)
    if (Number.isNaN(value)) return;

    updateOrbitalElements(selected, (prev)=>{
      const next: OrbitalElements = { ...prev }
      if (field === "a") {
        next.a = Math.max(0.0001, value)
      } else if (field === "e") {
        next.e = Math.min(0.9999, Math.max(0, value))
      } else if (field === "i") {
        next.i = Math.min(180, Math.max(0, value))
      } else if (field === "Ω" || field === "ω" || field === "M0") {
        const wrapped = ((value % 360) + 360) % 360
        next[field] = wrapped as any
      }
      return next
    })
  }

  return (
    <div className={"sidebar "+"sidebar-"+ (openMenu ? "open" : "close")}>
        <div className="sidebar-planet-presets">
          <div className="sidebar-element">
            <label style={{color: "white", display: "block", padding: "8px"}}>Planet</label>
            <select
              value={selected}
              onChange={(e)=>setSelected(e.target.value)}
              style={{ width: "90%", margin: "0 8px 8px 8px" }}
            >
              {planetKeys.map((k)=> (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
          {elements == null ? (
            <div className="sidebar-element" style={{color: "white", padding: "8px"}}>
              Orbital elements unavailable for this body.
            </div>
          ) : (
            <div className="sidebar-element" style={{color: "white", padding: "8px"}}>
              <div style={{marginBottom: "8px"}}>
                <label>a (AU)</label>
                <input type="number" step="0.001" value={elements.a} onChange={(e)=>handleNumberChange("a", e.target.value)} style={{width: "100%"}}/>
              </div>
              <div style={{marginBottom: "8px"}}>
                <label>e</label>
                <input type="number" step="0.001" value={elements.e} onChange={(e)=>handleNumberChange("e", e.target.value)} style={{width: "100%"}}/>
              </div>
              <div style={{marginBottom: "8px"}}>
                <label>i (deg)</label>
                <input type="number" step="0.1" value={elements.i} onChange={(e)=>handleNumberChange("i", e.target.value)} style={{width: "100%"}}/>
              </div>
              <div style={{marginBottom: "8px"}}>
                <label>Ω (deg)</label>
                <input type="number" step="0.1" value={elements.Ω} onChange={(e)=>handleNumberChange("Ω", e.target.value)} style={{width: "100%"}}/>
              </div>
              <div style={{marginBottom: "8px"}}>
                <label>ω (deg)</label>
                <input type="number" step="0.1" value={elements.ω} onChange={(e)=>handleNumberChange("ω", e.target.value)} style={{width: "100%"}}/>
              </div>
              <div style={{marginBottom: "8px"}}>
                <label>M0 (deg)</label>
                <input type="number" step="0.1" value={elements.M0} onChange={(e)=>handleNumberChange("M0", e.target.value)} style={{width: "100%"}}/>
              </div>
            </div>
          )}
        </div>
      <div className="sidebar-toggle-button" onClick={()=>setOpenMenu(openMenu => !openMenu)}>
        <img className="sidemenu-icon" src={icon}/>
      </div>
    </div>
  )
}