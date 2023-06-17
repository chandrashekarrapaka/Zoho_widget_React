import React from "react";
import Monitor from "./Monitor";
import './Machine.css'
function Machine(prop) {
    console.log(prop.machine);
    return (
        <div className="machines">
            {prop.machine.map(function (ele) {
                return (
                    <>
                        <div className="machine">
                        <h4 style={{ color: "black" }}>{ele.name}</h4>
                        <div className="signals" >
                        <Monitor monitor={ele.monitors} />
                        <h4>HS {ele.healthScore}</h4>
                        <div>&#128712;</div>
                        </div>
                        </div>
                    </>
                )
            }

            )}

        </div>
    )
}
export default Machine;
//  <div>
// <div className="MiniBox1">
// Combusion Motor
// </div>
// <div className="MiniBox2">
// <TinySignal/>
// </div>
// <div className="MiniBox3">
// HS {prop.hs}
// <div className="icon">&#x1F6C8;</div>
// </div>
// </div>