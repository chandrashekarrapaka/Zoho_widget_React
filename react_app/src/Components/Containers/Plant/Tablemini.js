import React from "react";
function Tablemini(prop){
    const data=prop.data;
    // console.log("tabledata"+JSON.stringify(data));
    return(
      <tr key={data.id}  >
      <td style={prop.stylz}>{data.name}</td><td>{Number(data.velocityX).toFixed(2)}</td><td>{Number(data.velocityY).toFixed(2)}</td><td>{Number(data.velocityZ).toFixed(2)}</td><td>{Number(data.temperature).toFixed(2)}</td><td>{(data.healthScore==0)?"NA":data.healthScore+"%"}</td><td>{data.trend}</td></tr>

    )
}
export default Tablemini;