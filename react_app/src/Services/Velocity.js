
export async function Velocity() {
    let accessToken = "";

    const arrayOfMachines = [];



    try {

        const loginResponse = await window.ZOHO.CREATOR.init().then(function (data) {
            let accessTokenz = "";
            let userid=window.ZOHO.CREATOR.UTIL.getQueryParams().user;
            //console.log("userid"+userid)
          
           var config = {
            appName: "uat-of-control-room",
            reportName: "My_Profile_Data",
            criteria: "Username ==\""+userid+"\"",
            page: "1",
            pageSize: "100"
          }
            const access = window.ZOHO.CREATOR.API.getAllRecords(config).then(function (response) {
                let userData = response;

                accessTokenz = userData.data[0].Access_Token;
                return accessTokenz;
            });
            return access;
        });
        const queryParams = await window.ZOHO.CREATOR.init().then(function (data) {
            return window.ZOHO.CREATOR.UTIL.getQueryParams();
        });

        const loginData = await loginResponse;
        // console.log("loginData"+ loginData);
        accessToken = loginData;
        //accessToken="eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIyY0NxRnpxRXJrNU5GS1RjTi1YSk1IdE9NS2tWVTZXS1hIdHZFMF8xZE5ZIn0.eyJleHAiOjE2ODY5NTQ5OTEsImlhdCI6MTY4NjkxMTc5MSwianRpIjoiNDU0MGQ1MTctNjE1ZS00NDZmLTgxOTgtNTc1YzY1ZjUwZmM3IiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5pbmZpbml0ZS11cHRpbWUuY29tL3JlYWxtcy9pZGFwIiwic3ViIjoiZjo2MGNhNzY4Yy1iMTA0LTQ0OTktYjU4Yy05MzliOTdlNzAzM2Q6ODcxMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImlkYXAiLCJzZXNzaW9uX3N0YXRlIjoiNGQ0YjUzMDAtM2NlZC00ZTk5LTlmNDEtYmRjMDI0ZjJkMzhlIiwic2NvcGUiOiJlbWFpbCIsInNpZCI6IjRkNGI1MzAwLTNjZWQtNGU5OS05ZjQxLWJkYzAyNGYyZDM4ZSIsImlzX2FkbWluIjoiZmFsc2UiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlkYXBfcm9sZSI6IlJPTEVfVVNFUiIsImVtYWlsIjoiUmFwYWthLmNoYW5kcmFzaGVrYXJAZ21haWwuY29tIn0.l8NL7t1Kqf77hOHo_kGSpcKzDoSjFFYmKdyn3y6-fC45B_ICvvYz_FLMfazPMOxVzMG0nb0nD88y_J45wFYTjLnfwbZbIzw--vbVKt1EMe4qK6ko4wv1jTRrjg97m7PaQL3FLcv1JSPafJ8ukPm1z4BPo0tpoHlbZX1vCGwm1ZgdJqTBM6bJrtrLyB1EcABWsXIbd7r_756vua7sOO_7ZkAppAiHTV3qqjM5N0cjHaKTkMXYAiVkl6kBpsZf7N8CCdwkZTKV3rapK_zQGJhS2VxSNkeiERF2Y16nyPxSjxyzQFBB6I0AB2xqSSWlhJ6Shk2yaaI1MB9_cdt8oOgJPg";
        //console.log("queryParamsvelocity" + JSON.stringify(queryParams));

        //console.log("accessToken"+accessToken);
        //console.log("check"+ accessToken);

        // let orgid=queryParams.PlantId.split(",")[1];
        const orgidAll = queryParams.PlantId.split(",");
        let plantsData;
        let plantsResponse
        plantsResponse = await Promise.all(orgidAll.map(async (orgid) => {
            plantsResponse = await fetch(`https://api.infinite-uptime.com/api/2.0/md/monitoring/bymonitors?plantId=${orgid}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer ' + accessToken,
                },
            });
            plantsData = await plantsResponse.json();
            
            plantsData.areas.map(area=>{
        area.machineGroups.map((mg) => {
                
        mg.machines.map((machine) => {
        arrayOfMachines.push(machine);
     })

    })

            })

        }));

        // console.log("velocityarrayofMachines", arrayOfMachines);

        return arrayOfMachines;


    } catch (error) {
        console.error(error);
        throw error;
    }
}
