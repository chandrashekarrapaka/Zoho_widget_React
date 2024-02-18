
export async function LoginCredentialsAndQueries() {
    let accessToken="";
    
      try {
         
        const loginResponse =  await window.ZOHO.CREATOR.init().then(function(data) {
          let accessTokenz="";
          let userid=window.ZOHO.CREATOR.UTIL.getQueryParams().user;
          //console.log("userid"+userid)
        
         var config = {
          appName: "thk-control-room",
          reportName: "My_Profile_Data",
          criteria: "Username ==\""+userid+"\"",
          page: "1",
          pageSize: "100"
        }
        const access=window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
          let userData = response;
          
          accessTokenz=userData.data[0].User_Name ;
          //console.log("userData"+JSON.stringify(userData.data[0].Access_Token));
         // console.log("check"+accessToken);
         // return accessToken;
        return accessTokenz;
        });
        return access;
      });
      const queryParams =  await window.ZOHO.CREATOR.init().then(function(data) { 
        return window.ZOHO.CREATOR.UTIL.getQueryParams();
      });
    
        const loginData = await loginResponse;

       accessToken = loginData;
         //console.log("queryParamsLOGIN"+JSON.stringify(queryParams));
         //console.log("dataused"+JSON.stringify(accessToken),queryParams)
        
        const lqp={accessToken,queryParams};
        // let orgid=queryParams.PlantId.split(",")[1];
        // const orgidAll=queryParams.PlantId.split(",");
      //console.log("dataused"+accessToken,queryParams)
        return accessToken;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    