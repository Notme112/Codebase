// ==UserScript==
// @name         Alert FMS5
// @version      1.0.0
// @description  Alerts an FMS5
// @author       NiZi112
// @match        *://rettungssimulator.online/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

(function() {
    'use strict';
    try {
        socket.on("vehicleFMS", (obj) => {
            if(obj.userVehicleFMS != 5) return
            noticeModal(`Sprechwunsch`, `${obj.userVehicleName} hat einen Sprechwunsch`, 'öffnen', () => {
                if(obj.vehicleID == 43){
                    openFrame(`/vehicle/${obj.userVehicleID}`, '1/2/4/4')
                }else{
                    openFrame(`/mission/${obj.userMissionID}`, '1/1/4/5')
                }
            })
        })
    }catch (e) {
        console.error('socket not found')
    }
})();
