import React from "react";

function KPI(props) {
  return (
    <div className="col-lg-2 col-sm-4 mb-2">
      <div className="about-brand-box" >
        <div className="left-content">
          <p className="mb-0 fs-13 text-white">{props.data.value}</p>
          <p className="mb-0 text-white fs-4 fw-800">{props.data.title}</p>
        </div>
        {props.data.src ? (
          <div className="right-content-box">
            <img src={props.data.src} alt="Broadcasting icon" className="img-fluid" />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default KPI;
