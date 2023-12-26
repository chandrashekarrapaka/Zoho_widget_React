const Footerhs=()=>{
    
    return(

        <div className="health-score-sec">
        <div className="row">
          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 md:px-3 px-1">
              <div className="score-box green"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score &gt; 80%</p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box yellow"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score &gt; 50% &lt; 80%
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box red"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Health Score &lt; 50%
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3" >
              <div  style={{backgroundColor:"white",border:"solid 1px"}} className="score-box " ></div>
              <p className="text-dark fs-14 mb-0 fw-bold " >Health Score Not Available
              </p>
            </div>
          </div>
        </div>
      </div>
        
    );
}
export default Footerhs;