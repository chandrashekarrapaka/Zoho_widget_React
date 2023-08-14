
export async function Image() {
    let accessToken="";
    
      try {
         
        const loginResponse =  await window.ZOHO.CREATOR.init().then(function(data) {
          let accessTokenz="";
          let userid = window.ZOHO.CREATOR.UTIL.getQueryParams().user;
        
         var config = {
          appName: "infinite-control-room",
          reportName: "My_Profile_Data",
          criteria: "Username == \"" + userid + "\"",
          page: "1",
          pageSize: "100"
        }
        const access=window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
          let userData = response;
          
          accessTokenz=userData.data[0].Image_URL;
          //console.log("userDataimage"+JSON.stringify(userData.data[0]));
         // console.log("check"+accessToken);
         // return accessToken;
        return accessTokenz;
        });
        return access;
      });
      
    
        const loginData = await loginResponse;

       accessToken = loginData;
         
        // const lqp={accessToken,queryParams};
       //console.log("imageURL"+accessToken)
        return accessToken;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    