import React from "react";
import './Monitor.css'
function Monitor(prop){
   // const boxzz=prop.monitor;
    console.log("monitors"+prop.monitor[1]);
    return(
        <div>
            <div>
            {
                Object(prop.monitor).map(function(ele){
                   return(
                     
                     <div className="boxzz">{ele.healthScore}</div>
                   )

                })
            }
            </div>
        </div>
    )
}
export default Monitor;