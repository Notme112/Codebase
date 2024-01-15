// ==UserScript==
// @name         [CB] AlarmAndNextMission
// @version      1.0.0
// @description  Alarms Back-BTN!
// @author       NiZi112
// @match        *://rettungssimulator.online/mission/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==
/* global $ noticeModal */
//TODO: prev mission, option to open next call mask when no mission

(async function() {
    if(self == top){
        noticeModal('Fehler', 'Das Script AlarmAndNextMission kann nur verwendet werden, wenn ein Einsatz in einem Iframe geöffnet wird!', 'Schließen');
        return false;
    }
    if(!parseInt($(`.missions-container .mission-list-mission[usermissionid="${MISSION_ID}"]`, parent.document).next().attr('usermissionid'))) return;
    //create button & add event listener
    let nextMissionPending = false;
    $('.fixed-footer').append(`<button class="button button-round button-success button-disabled" id="alarm-submit-next"></button>
                              <button class="button button-round button-success buton-disabled" id="alarm-submit-share-next"></button>
                              <button class="button button-round button-success" id="next-mission"></button>`);
    let btn_alarm_next = $('#alarm-submit-next');
    let btn_next = $('#next-mission');
    let btn_alarm_share_next = $('#alarm-submit-share-next');
    function update(){
        let alarm_html = "<i class='fas fa-bell'></i> Alarmieren und weiter";
        let next_html = "<i class='fa-sharp fa-solid fa-arrow-right'></i> Weiter";
        let share_html = "<i class='fas fa-sitemap'></i> Alarmieren, Freigeben und weiter"
        if($('#mission-vehicle-group-by-vehicle .mission-vehicle-selected').length){
            $(btn_alarm_share_next).removeClass('button-disabled').html(share_html + ' (' + $('#mission-vehicle-group-by-vehicle .mission-vehicle-selected').length + ')');
            $(btn_alarm_next).removeClass('button-disabled').html(alarm_html + ' (' + $('#mission-vehicle-group-by-vehicle .mission-vehicle-selected').length + ')');
        } else {
            $(btn_alarm_share_next).addClass('button-disabled').html(share_html);
            $(btn_alarm_next).addClass('button-disabled').html(alarm_html);
        }
        $(btn_next).html(next_html);
        if(parent.ControlCenter.missions[MISSION_ID].isShared) $(btn_alarm_share_next).remove();
    }
    update();
    let updateAlarmingButtonVehicleCountOrig = updateAlarmingButtonVehicleCount;
    updateAlarmingButtonVehicleCount = function(...args){
        updateAlarmingButtonVehicleCountOrig(...args);
        update();
    }
    let updateAAOButtonsOrig = updateAAOButtons;
    updateAAOButtons = function(...args){
        console.log('hallooooooo')
        updateAAOButtonsOrig(...args);
        console.log(nextMissionPending);
        if(nextMissionPending) {
            nextMission();
            nextMissionPending = false;
        }
    }
    function nextMission(){
        parent.openFrame('mission/' + $(`.missions-container .mission-list-mission[usermissionid="${MISSION_ID}"]`, parent.document).next().attr('usermissionid'), '1/1/4/5')
    }
    function alarm(){
        $('.alarming-submit').click();
        nextMissionPending = true;
    }
    $(btn_alarm_share_next).on('click', async () => {
        if($(btn_alarm_share_next).hasClass('button-disabled')) return;
        await shareMission();
        $(btn_alarm_share_next).remove();
        alarm();
    });
    $(btn_alarm_next).on('click', () => {
        if($(btn_alarm_next).hasClass('button-disabled')) return;
        alarm();
    });
    $(btn_next).on('click', () => {
        nextMission();
    });
    setInterval(() => {
        update();
    }, 1000);
    $(document).on('keyup', (e) => {
        if(e.code == 'KeyN') $(btn_alarm_next).click();
    })
})();
