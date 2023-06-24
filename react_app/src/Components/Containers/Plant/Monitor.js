import React from "react";
import './Monitor.css'
function Monitor(prop) {
    // const boxzz=prop.monitor;
    //  console.log("monitors"+JSON.stringify(prop.monitor[1]));

    return (
        <div className="MonitorWrapper">
            {
                Object(prop.monitor).map(function (ele) {
                    const style = {};
                    if (ele.healthScore > 80);
                    else if (ele.healthScore > 50 && ele.healthScore < 80) style.backgroundColor = "rgb(255, 193, 7)";
                    else if (ele.healthScore > 0 && ele.healthScore < 50) style.backgroundColor = "rgb(255, 87, 34)";
                    else {
                        style.backgroundColor = "white";
                        style.border = "solid 1px";
                    }
                    
                    return (

                        <div className="boxzz" style={style}></div>
                    )

                })
            }
        </div>
    )
}
export default Monitor;