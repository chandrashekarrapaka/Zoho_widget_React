import React from "react";
function Monitor(prop) {
    // const boxzz=prop.monitor;
    //  console.log("monitors"+JSON.stringify(prop.monitor[1]));

    return (
        <>
            {
                Object(prop.monitor).map(function (ele) {
                    const style = {"padding":"2%"};
                    if (ele.status == 1 ||ele.status==2)style.backgroundColor = "#64DD17";
                    else if (ele.status==3) style.backgroundColor = "#FFC107";
                    else if (ele.status ==4) style.backgroundColor = "#FF5722";
                    else {
                        style.backgroundColor = "#9E9E9E";
                    }
                    
                    return (
                        
                        
                            <div className="box" style={style}></div>
                      
                        
                    )

                })
            }
        </>
    )
}
export default Monitor;