const Footerdrs=()=>{
    
  return(

      <div className="health-score-sec">
      <div className="row">
        <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
          <div className="health-score-box py-2 px-3 border border-dark">
            <div className="score-box green"></div>
            <p className="text-dark fs-14 mb-0 fw-bold">Green</p>
          </div>
        </div>

        <div className="col-lg-3 mb-2 col-md-6 col-sm-6">
          <div className="health-score-box py-2 px-3 border border-dark">
            <div className="score-box yellow"></div>
            <p className="text-dark fs-14 mb-0 fw-bold">Red
            </p>
          </div>
        </div>

      </div>
    </div>
      
  );
}
export default Footerdrs;