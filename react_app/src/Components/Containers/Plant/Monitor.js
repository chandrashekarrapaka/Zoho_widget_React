import React from "react";
import './Monitor.css'
function Monitor(prop){
   // const boxzz=prop.monitor;
    console.log("monitors"+prop.monitor[1]);
    return(
        <div className="MonitorWrapper">
            {
                Object(prop.monitor).map(function(ele){
                   return(
                     
                     <div className="boxzz"></div>
                   )

                })
            }
        </div>
    )
}
export default Monitor;