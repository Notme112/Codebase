// ==UserScript==
// @name         Keys MissionForm
// @version      1.0.0
// @description  Erweitert die Keys-Funktionen!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @match        https://rettungssimulator.online/missionNew/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const keys = {
        65: '.call-prev',
        68: '.call-next',
        83: '#missionForm',
        81: '#missionNewOpen',
        69: '#missionNewSave',
    };
    const handleKeydown = (e) => {
        if($('input, textarea').is(':focus')) return
        $(keys[e.keyCode]).click();
    };
    $(document).on('keydown', handleKeydown)
})();
