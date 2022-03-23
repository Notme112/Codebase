// ==UserScript==
// @name         Filter
// @version      1.0.1
// @description  Filtert Missionen nach Status!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ socket */

(function() {

    'use strict';

    if(!localStorage.missionsHide){
        localStorage.missionsHide = JSON.stringify({"red": false, "yellow": false, "green": false});
    };
    var hide = JSON.parse(localStorage.missionsHide);

    function hideMissions(mission){
        switch(mission){
            case 1:
                if(hide.red){
                    $(".mission-list-progress-1").parent().show();
                    hide.red = false;
                }else{
                    $(".mission-list-progress-1").parent().hide();
                    hide.red = true;
                }
                break;
            case 2:
                if(hide.yellow){
                    $(".mission-list-progress-2").parent().show();
                    hide.yellow = false;
                }else{
                    $(".mission-list-progress-2").parent().hide();
                    hide.yellow = true;
                }
                break;
            case 3:
                if(hide.green){
                    $(".mission-list-progress-3").parent().show();
                    hide.green = false;
                }else{
                    $(".mission-list-progress-3").parent().hide();
                    hide.green = true;
                }
                break;
        };
        localStorage.missionsHide = JSON.stringify(hide);
    };

    $("#missions .panel-expand").before("<span class='label label-danger' id='hideMissions1'>&bull;</span><span id='hideMissions2' class='label label-warning'>&bull;</span><span id='hideMissions3' class='label label-success'>&bull;</span>")

    $('#hideMissions1').on('click', () => {
        hideMissions(1)
    })
    $('#hideMissions2').on('click', () => {
        hideMissions(2)
    })
    $('#hideMissions3').on('click', () => {
        hideMissions(3)
    })

    socket.on("missionStatus", (missionStatusObject) => {
        if(missionStatusObject.userMissionStatus == 1 && hide.red){$(".mission-list-progress-1").parent().hide();}
        if(missionStatusObject.userMissionStatus == 2 && hide.yellow){$(".mission-list-progress-2").parent().hide();}
        if(missionStatusObject.userMissionStatus == 3 && hide.green){$(".mission-list-progress-3").parent().hide();}
    });

    socket.on("newMission", (missionObject) => {
        if(hide.red){$(".mission-list-progress-1").parent().hide();}
    });
    if(hide.red) hideMissions(1)
    if(hide.yellow) hideMissions(2)
    if(hide.green) hideMissions(3)
})();
