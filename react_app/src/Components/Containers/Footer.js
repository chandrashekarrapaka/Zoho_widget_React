const Footer=()=>{
    
    return(

        <div className="health-score-sec">
        <div className="row">
          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 md:px-3 px-1">
              <div className="score-box green"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Normal</p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box yellow"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Caution
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box red"></div>
              <p className="text-dark fs-14 mb-0 fw-bold">Warning
              </p>
            </div>
          </div>

          <div className="col-lg-3 mb-3 col-md-6 col-sm-6">
            <div className="health-score-box py-2 px-3">
              <div className="score-box text-bg-secondary"></div>
              <p className="text-dark fs-14 mb-0 fw-bold " >Disconnected
              </p>
            </div>
          </div>
        </div>
      </div>
        
    );
}
export default Footer;