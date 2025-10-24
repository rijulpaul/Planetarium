import { useState } from "react";
import "./sidemenu.css"

export default function Sidemenu() {

    const [openMenu, setOpenMenu] = useState<boolean>(true)

    return (
            <div className={"sidebar "+"sidebar-"+ (openMenu ? "open" : "close")}>
                <div className="sidebar-toggle-button" onClick={()=>setOpenMenu(openMenu => !openMenu)}>
                </div>
            </div>
    )
}
