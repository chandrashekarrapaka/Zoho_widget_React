import React from "react";
import './MiniBox.css'
import TinySignal from "./TinySignal";
function MiniBox(prop) {
    return (
        <div>
        <div className="MiniBox1">
           Combusion Motor
        </div>
        <div className="MiniBox2">
        <TinySignal/>
       </div>
       <div className="MiniBox3">
        HS {prop.hs}
       <div className="icon">&#x1F6C8;</div>
       </div>
       </div>
    );
}
export default MiniBox;