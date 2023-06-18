import React from "react";
import './Monitor.css'
function Monitor(prop){
   // const boxzz=prop.monitor;
    console.log("monitors"+JSON.stringify(prop));
    return(
        <div>
            <div className="MonitorWrapper">
            {
                Object(prop.monitor).map(function(ele){
                   return(
                     
                     <div className="boxzz">{ele.healthScore}</div>
                   )

                })
            }
            
        </div>
    )
}
export default Monitor;