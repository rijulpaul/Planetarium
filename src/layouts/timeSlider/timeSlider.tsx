import { Slider, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"

import './timeSlider.css'
import { useTime } from "../../store/useTime"
import { useTimeSlide } from "../../store/useTimeSlide"


export default function TimeSlider() {
    const marks = useMemo(() => [
        { value: 0, label1: "-1 year / second", multiplier: -(60*60*24*365) },
        { value: 1, label1: "-10 month(s) / second", multiplier: -(60*60*24*30*10) },
        { value: 2, label1: "-8 month(s) / second", multiplier: -(60*60*24*30*8) },
        { value: 3, label1: "-4 month(s) / second", multiplier: -(60*60*24*30*4) },
        { value: 4, label1: "-2 month(s) / second", multiplier: -(60*60*24*30*2) },
        { value: 5, label1: "-1 month(s) / second", multiplier: -(60*60*24*30*1) },
        { value: 6, label1: "-3 week(s) / second", multiplier: -(60*60*24*7*3) },
        { value: 7, label1: "-2 week(s) / second", multiplier: -(60*60*24*7*2) },
        { value: 8, label1: "-1 week(s) / second", multiplier: -(60*60*24*7*1) },
        { value: 9, label1: "-5 day(s) / second", multiplier: -(60*60*24*5) },
        { value: 10, label1: "-2 day(s) / second", multiplier: -(60*60*24*2) },
        { value: 11, label1: "-1 day(s) / second", multiplier: -(60*60*24*1) },
        { value: 12, label1: "-18 hour(s) / second", multiplier: -(60*60*18) },
        { value: 13, label1: "-12 hour(s) / second", multiplier: -(60*60*12) },
        { value: 14, label1: "-6 hour(s) / second", multiplier: -(60*60*6) },
        { value: 15, label1: "-3 hour(s) / second", multiplier: -(60*60*2) },
        { value: 16, label1: "-1 hour(s) / second", multiplier: -(60*60*1) },
        { value: 17, label1: "-30 minute(s) / second", multiplier: -(60*30) },
        { value: 18, label1: "-15 minute(s) / second", multiplier: -(60*15) },
        { value: 19, label1: "-10 minute(s) / second", multiplier: -(60*10) },
        { value: 20, label1: "-5 minute(s) / second", multiplier: -(60*5) },
        { value: 21, label1: "-1 minutes(s) / second", multiplier: -(60*1) },
        { value: 22, label1: "-45 second(s) / second", multiplier: -45 },
        { value: 23, label1: "-30 second(s) / second", multiplier: -30 },
        { value: 24, label1: "-10 second(s) / second", multiplier: -10 },
        { value: 25, label1: "-5 second(s) / second", multiplier: -5 },
        { value: 26, label1: "-1 second(s) / second", multiplier: -1 },
        { value: 27, label1: "0 second(s) per second", multiplier: 0 },
        { value: 28, label1: "1 second(s) / second", multiplier: 1 },
        { value: 29, label1: "5 second(s) / second", multiplier: 5 },
        { value: 30, label1: "10 second(s) / second", multiplier: 10 },
        { value: 31, label1: "30 second(s) / second", multiplier: 30 },
        { value: 32, label1: "1 minutes(s) / second", multiplier: 60*1 },
        { value: 33, label1: "5 minute(s) / second", multiplier: 60*5 },
        { value: 34, label1: "10 minute(s) / second", multiplier: 60*10 },
        { value: 35, label1: "15 minute(s) / second", multiplier: 60*15 },
        { value: 36, label1: "30 minute(s) / second", multiplier: 60*30 },
        { value: 37, label1: "45 minute(s) / second", multiplier: 60*45 },
        { value: 38, label1: "1 hour(s) / second", multiplier: 60*60*1 },
        { value: 39, label1: "3 hour(s) / second", multiplier: 60*60*2 },
        { value: 40, label1: "6 hour(s) / second", multiplier: 60*60*6 },
        { value: 41, label1: "12 hour(s) / second", multiplier: 60*60*12 },
        { value: 42, label1: "18 hour(s) / second", multiplier: 60*60*18 },
        { value: 43, label1: "1 day(s) / second", multiplier: 60*60*24*1 },
        { value: 44, label1: "2 day(s) / second", multiplier: 60*60*24*2 },
        { value: 45, label1: "5 day(s) / second", multiplier: 60*60*24*5 },
        { value: 46, label1: "1 week(s) / second", multiplier: 60*60*24*7*1 },
        { value: 47, label1: "2 week(s) / second", multiplier: 60*60*24*7*2 },
        { value: 48, label1: "3 week(s) / second", multiplier: 60*60*24*7*3 },
        { value: 49, label1: "1 month(s) / second", multiplier: 60*60*24*30*1 },
        { value: 50, label1: "2 month(s) / second", multiplier: 60*60*24*30*2 },
        { value: 51, label1: "4 month(s) / second", multiplier: 60*60*24*30*4 },
        { value: 52, label1: "8 month(s) / second", multiplier: 60*60*24*30*8 },
        { value: 53, label1: "10 month(s) / second", multiplier: 60*60*24*30*10 },
        { value: 54, label1: "1 year / second", multiplier: 60*60*24*365 },
    ], [])

    const value = useTimeSlide((state)=>(state.sliderIndex))
    const changeValue = useTimeSlide((state)=>(state.updateIndex))

    const [label1,setlabel1] = useState<string>(marks[value].label1)

    const live = useTime(state=>state.live)
    const setLive = useTime(state=>state.updateLive)

    const setMult = useTime(state => state.updateMult)

    useEffect(()=>{
        setlabel1(marks[value].label1
        )
        setMult(100*marks[value].multiplier) // s to ms
        if (live) setLive(!live)
    },[value,live,marks,setLive,setMult])


    function handleChange(_:Event, value:number) {
        changeValue(value);
        setlabel1(marks[value].label1
        )
        setMult(100*marks[value].multiplier) // s to ms
    }

    function toggleLive() {
        const currValue = live ? value : 28
        setLive(!live)
        changeValue(currValue)
    }

    return(
      <div className="slider-box">
        <Typography id="non-linear-slider" style={{display: "flex", justifyContent: "space-between", alignItems: "end"}} fontFamily={"Gruppo"}  gutterBottom>
          <span>
            <span className="time-slider-time">{label1.slice(0,label1.search(' '))}</span>
            <span className="time-slider-units">{" " + label1.slice(label1.search(' '))}</span>
          </span>
          <button className={"live-button " + (live && "isLive")} onClick={toggleLive}>LIVE</button>
        </Typography>
        <Slider
          className="slider"
          value={value}
          defaultValue={value}
          min={0}
          step={null}
          marks={marks}
          max={marks.length}
          onChange={handleChange}
          track={false}
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
              backgroundColor: "#a0a0a0",
            },
          }}
        />
      </div>
    )
}
