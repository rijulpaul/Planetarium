import { useMemo, useState } from "react";
import { Slider, Tooltip, IconButton } from "@mui/material";

import "./sidemenu.css"
import icon from "../../../public/edit.svg"
import usePlanetData from "../../store/usePlanetData";
import type { OrbitalElements } from "../../utils/planetData";

import { useSpaceUI } from "../../store/useSpaceUI";

export default function Sidemenu() {

  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const planets = usePlanetData((s)=>s.planets)
  const updateOrbitalElements = usePlanetData((s)=>s.updateOrbitalElements)
  const planetKeys = useMemo(()=>Object.keys(planets), [planets])
  const [selected, setSelected] = useState<string>(()=>planetKeys.find(k=>k!=="sun") ?? planetKeys[0] ?? "")

  const elements: OrbitalElements | null = planets[selected]?.orbitalElements ?? null

  const parameterDescriptions: Record<keyof OrbitalElements, string> = {
    a: "Semi-major axis (AU): Average orbital radius (distance from Sun).",
    e: "Eccentricity: How elliptical the orbit is (0 = circle, 1 = parabola).",
    i: "Inclination (°): Tilt of the orbital plane relative to the ecliptic plane.",
    Ω: "Longitude of ascending node (°): The angle from the reference direction (vernal equinox) to where the planet crosses the ecliptic from south to north.",
    ω: "Argument of perihelion (°): Angle from the ascending node to the point of closest approach to the Sun (perihelion).",
    M0: "Mean anomaly at epoch (°): Where the planet was in its orbit at a specific reference time (epoch J2000 here)."
  }

  const parameterRanges: Record<keyof OrbitalElements, {min: number, max: number, step: number}> = {
    a: { min: 0, max: 100, step: 0.1 },
    e: { min: 0, max: 1, step: 0.001 },
    i: { min: 0, max: 180, step: 0.1 },
    Ω: { min: 0, max: 360, step: 0.1 },
    ω: { min: 0, max: 360, step: 0.1 },
    M0: { min: 0, max: 360, step: 0.1 }
  }

  function handleSliderChange(field: keyof OrbitalElements, value: number | number[]) {
    if (!elements) return;
    const numValue = typeof value === "number" ? value : value[0];
    
    updateOrbitalElements(selected, (prev)=>{
      const next: OrbitalElements = { ...prev }
      const range = parameterRanges[field]
      const clamped = Math.min(range.max, Math.max(range.min, numValue))
      next[field] = clamped as any
      return next
    })
  }

  function handleValueInputChange(field: keyof OrbitalElements, raw: string) {
    if (!elements) return;
    const value = parseFloat(raw)
    if (Number.isNaN(value)) return;

    const range = parameterRanges[field]
    const clamped = Math.min(range.max, Math.max(range.min, value))
    
    updateOrbitalElements(selected, (prev)=>{
      const next: OrbitalElements = { ...prev }
      next[field] = clamped as any
      return next
    })
  }

  const showUI = useSpaceUI(state=>state.active);

  const renderParameter = (field: keyof OrbitalElements, label: string) => {
    if (!elements) return null;
    const range = parameterRanges[field];
    
    return (
      <div className="sidebar-element" style={{padding: "4px 12px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px"}}>
          <div style={{display: "flex", alignItems: "center", gap: "4px"}}>
            <span style={{color: "white", fontSize: "16px", letterSpacing: "0"}}>{label}</span>
            <Tooltip title={parameterDescriptions[field]} placement="right" style={{fontFamily: "Gruppo"}}>
              <IconButton size="small" style={{padding: "2px"}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
                  <text x="12" y="17" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="14" fontWeight="bold">i</text>
                </svg>
              </IconButton>
            </Tooltip>
          </div>
          <input
            type="number"
            value={elements[field].toFixed(range.step >= 1 ? 1 : 3)}
            onChange={(e)=>handleValueInputChange(field, e.target.value)}
            onBlur={(e)=>handleValueInputChange(field, e.target.value)}
            step={range.step}
            min={range.min}
            max={range.max}
            style={{
              width: "60px",
              padding: "2px 4px",
              background: "#1a1a1a",
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontSize: "12px",
            }}
          />
        </div>
        <Slider
          value={elements[field]}
          onChange={(_, val) => handleSliderChange(field, val)}
          min={range.min}
          max={range.max}
          step={range.step}
          sx={{
            color: "#000000",
            '& .MuiSlider-thumb': {
              backgroundColor: "#1a1a1a",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "none",
              '&:hover': {
                boxShadow: "none",
              },
              '&:focus': {
                boxShadow: "none",
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: "#404040",
            },
            '& .MuiSlider-rail': {
              backgroundColor: "rgba(255,255,255,0.3)",
            },
          }}
        />
      </div>
    );
  }

  return (
    <>
    { 
    showUI &&
    <div className={"sidebar "+"sidebar-"+ (openMenu ? "open" : "close")} style={{padding: "5px"}}>
        <div className="sidebar-planet-presets">
          <div className="sidebar-element">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 8px 20px 8px"}}>
              <label style={{fontSize: "24px",color: "white", display: "block", marginRight: "60px"}}>Planet</label>
              <select
                value={selected}
                onChange={(e)=>setSelected(e.target.value)}
                style={{ 
                  padding: "4px 18px",
                  background: "#1a1a1a",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "14px"
                }}
              >
                {planetKeys.map((k)=> (
                  <option key={k} value={k} style={{background: "black", color: "white"}}>{k}</option>
                ))}
              </select>
            </div>
          </div>
          {elements == null ? (
            <div className="sidebar-element" style={{color: "white", padding: "8px"}}>
              Orbital elements unavailable for this body.
            </div>
          ) : (
            <>
              {renderParameter("a", "a (AU)")}
              {renderParameter("e", "e")}
              {renderParameter("i", "i (deg)")}
              {renderParameter("Ω", "Ω (deg)")}
              {renderParameter("ω", "ω (deg)")}
              {renderParameter("M0", "M0 (deg)")}
            </>
          )}
        </div>
      <div className="sidebar-toggle-button" onClick={()=>setOpenMenu(openMenu => !openMenu)}>
        <img style={{aspectRatio: "1 1", height: "3rem"}} className="sidemenu-icon" src={icon}/>
      </div>
    </div>
  }
  </>
  )
}
