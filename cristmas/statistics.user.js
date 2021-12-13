// ==UserScript==
// @name         Statistiken
// @version      1.0.0
// @description  Zeigt Einsatzstatistiken!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    GM_addStyle(`.nizi112:focus{outline:none};`)
    'use strict';
    var red = 0;
    var yellow = 0;
    var green = 0;
    var rPer = 0;
    var yPer = 0;
    var gPer = 0;
    var data;
    function calcPercent(){
        red = $('.mission-list-progress-1').length;
        yellow = $('.mission-list-progress-2').length;
        green = $('.mission-list-progress-3').length;
        var all = red + yellow + green;
        rPer = red/all*100;
        yPer = yellow/all*100;
        gPer = green/all*100;
        if(isNaN(rPer)) rPer = 0;
        if(isNaN(yPer)) yPer = 0;
        if(isNaN(gPer)) gPer = 0;
        data = `Rot: ${red} (${rPer}%), Gelb: ${yellow} (${yPer}%), Grün: ${green} (${gPer}%)`
        $('#missionPercent').attr('data-tooltip', data)
    };
    calcPercent();
    $('.panel-expand').before(`<span class="fa fa-info-circle nizi112" id="missionPercent" data-tooltip="${data}"></span>`);
    socket.on('missionStatus', function(obj){
        calcPercent();
    });
})();
