
export async function Velocity() {
    let accessToken = "";
    const arrayOfMachines = [];

    try {
        const loginResponse = await window.ZOHO.CREATOR.init().then(function (data) {
            let accessTokenz = "";
            let userid = window.ZOHO.CREATOR.UTIL.getQueryParams().user;

            var config = {
                appName: "infinite-control-room",
                reportName: "My_Profile_Data",
                criteria: "Username ==\"" + userid + "\"",
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
        accessToken = loginData;
        const orgidAll = queryParams.PlantId.split(",");
        let plantsData;
        let machineIds;
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

            plantsData.machineGroups.map(async (mg) => {
                mg.machines.map((machine) => {
                    machine.drsplantid = orgid;
                    arrayOfMachines.push(machine);
                })
            });
        }));

        return arrayOfMachines;
    } catch (error) {
        console.error(error);
        throw error;
    }
}