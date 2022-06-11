// ==UserScript==
// @name         AverageMoneyInMissionOverview
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  shows the average amount of money per mission in total
// @author       NiZi112
// @match        https://rettungssimulator.online/missionOverview
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function getAverageMissionCredits(){
        let list = document.querySelectorAll('table > tbody > tr > td:nth-child(3) > a');
        let sum = 0;
        list.forEach((el) => {
            sum += parseInt(el.innerHTML.replaceAll('.', ''))
        })
        return sum / list.length
    }
    $('.detail-subtitle').append(`<span class="label label-info">Durchschnittlicher Verdienst pro Einsatz: ${getAverageMissionCredits()}</span>`)
})();