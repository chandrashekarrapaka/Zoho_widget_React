
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
         // return accessToken;
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
       // accessToken = loginData.data.accessToken;
       accessToken="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyY0NxRnpxRXJrNU5GS1RjTi1YSk1IdE9NS2tWVTZXS1hIdHZFMF8xZE5ZIn0.eyJleHAiOjE2ODY5NTQ5OTEsImlhdCI6MTY4NjkxMTc5MSwianRpIjoiNDU0MGQ1MTctNjE1ZS00NDZmLTgxOTgtNTc1YzY1ZjUwZmM3IiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5pbmZpbml0ZS11cHRpbWUuY29tL3JlYWxtcy9pZGFwIiwic3ViIjoiZjo2MGNhNzY4Yy1iMTA0LTQ0OTktYjU4Yy05MzliOTdlNzAzM2Q6ODcxMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlkYXAiLCJzZXNzaW9uX3N0YXRlIjoiNGQ0YjUzMDAtM2NlZC00ZTk5LTlmNDEtYmRjMDI0ZjJkMzhlIiwic2NvcGUiOiJlbWFpbCIsInNpZCI6IjRkNGI1MzAwLTNjZWQtNGU5OS05ZjQxLWJkYzAyNGYyZDM4ZSIsImlzX2FkbWluIjoiZmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlkYXBfcm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoiUmFwYWthLmNoYW5kcmFzaGVrYXJAZ21haWwuY29tIn0.l8NL7t1Kqf77hOHo_kGSpcKzDoSjFFYmKdyn3y6-fC45B_ICvvYz_FLMfazPMOxVzMG0nb0nD88y_J45wFYTjLnfwbZbIzw--vbVKt1EMe4qK6ko4wv1jTRrjg97m7PaQL3FLcv1JSPafJ8ukPm1z4BPo0tpoHlbZX1vCGwm1ZgdJqTBM6bJrtrLyB1EcABWsXIbd7r_756vua7sOO_7ZkAppAiHTV3qqjM5N0cjHaKTkMXYAiVkl6kBpsZf7N8CCdwkZTKV3rapK_zQGJhS2VxSNkeiERF2Y16nyPxSjxyzQFBB6I0AB2xqSSWlhJ6Shk2yaaI1MB9_cdt8oOgJPg";
         //console.log(loginData);
        //console.log("accessToken"+accessToken);
        console.log("check"+ accessToken);
        const plantsResponse = await fetch('https://api-idap.infinite-uptime.com/api/3.0/idap-api/plants/1868/machine-group-stats', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
        });
        //console.log("check"+ headers);
        const plantsData = await plantsResponse.json();
         console.log("plantsdata",  plantsData);
    
        return plantsData.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    