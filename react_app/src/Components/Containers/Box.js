import React from "react";  
import MiniBox from "../MiniBox";
import './Box.css'
function Box(prop){
    //console.log(prop);
    return(
        <div className="box">
           <MiniBox hs={prop.name}/>
        </div>
    )
}
export default Box;