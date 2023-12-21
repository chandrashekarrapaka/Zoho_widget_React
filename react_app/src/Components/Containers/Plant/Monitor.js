import React from "react";
function Monitor(prop) {
    // const boxzz=prop.monitor;
    //  console.log("monitors"+JSON.stringify(prop.monitor[1]));

    console.log(prop.currentMachineStatus);
    return (
        <>
            {
                Object(prop.monitor).map(function (ele) {
                    const style = { "padding": "2%", backgroundColor: "#64DD17" };

                    if (prop.currentMachineStatus && prop.currentMachineStatus[ele.id] && prop.currentMachineStatus[ele.id] == 'NEW') {
                        style.backgroundColor = "#FF5722";
                    }

                    return (
                        <div className="box" style={style}></div>
                    );
                })
            }
        </>
    )
}
export default Monitor;