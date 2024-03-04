
export async function Plants() {
    let accessToken="";
    const handleScriptLoad = async() => {
      
      console.log("hero")
      await window.ZOHO.CREATOR.init().then(function(data) {
        
      // var queryParams = window.ZOHO.CREATOR.UTIL.getQueryParams();
       const email="rapaka.chandrashekar@gmail.com";//Stage == \"Open\"
         var config = {
          appName: "uat-of-control-room",
          reportName: "All_Users",
          criteria: "Username ==\"rapaka.chandrashekar@gmail.com\"",
          page: "1",
          pageSize: "100"
        }
    
        //get all records API
        window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
          //callback block
          let userData = response;
          
          accessToken=JSON.stringify(userData.data[0].Access_Token);
          console.log("userData"+JSON.stringify(userData.data[0].Access_Token));
         // console.log("check"+accessToken);
          return accessToken;
        });
        
        
      });
     
     
    };
   await handleScriptLoad();
    
    
      try {
        const loginResponse = await fetch(`https://api-idap.infinite-uptime.com/api/3.0/idap-api/login`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'accept': 'application/json',
          },
          body: JSON.stringify({
            username: 'rapaka.chandrashekar@gmail.com',
            password: 'chanduR00002@'
          })
        });
        console.log("json.js called1");
    
        const loginData = await loginResponse.json();
        accessToken = loginData.data.accessToken;
         console.log(loginData);
        console.log("accessToken"+accessToken);
        console.log("check"+accessToken);
        const plantsResponse = await fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/plants/1868/machine-group-stats', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
        });
    
        const plantsData = await plantsResponse.json();
         console.log("plantsdata",  plantsData);
    
        return plantsData.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    