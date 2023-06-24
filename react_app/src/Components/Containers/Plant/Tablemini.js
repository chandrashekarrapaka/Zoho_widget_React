import React from "react";
function Tablemini(prop){
    const data=prop.data;
    // console.log("tabledata"+JSON.stringify(data));
    return(
      <tr key={data.id} style={prop.stylz} >
      <td>{data.name}</td><td>{data.velocityX}</td><td>{data.velocityY}</td><td>{data.velocityZ}</td><td>{data.temperature}</td><td>{data.healthScore}%</td><td>{data.trend}</td></tr>

    )
}
export default Tablemini;