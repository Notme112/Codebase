// ==UserScript==
// @name         KeysInMission
// @version      1.1
// @description  Allows to click some elements via keypress
// @author       Notme112, Ron31
// @match        https://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @updateURL    https://github.com/Notme112/Codebase/raw/main/cristmas/keys.user.js
// @grant        none
// ==/UserScript==
/* global $ */

(function () {
    'use strict';
    const hotkeys = {
        120: '.alarming-submit',
        121: '.alarming-submit-close',
        49: '.mission-aao:nth-of-type(1)',
        50: '.mission-aao:nth-of-type(2)',
        51: '.mission-aao:nth-of-type(3)',
        52: '.mission-aao:nth-of-type(4)',
        53: '.mission-aao:nth-of-type(5)',
        54: '.mission-aao:nth-of-type(6)',
        55: '.mission-aao:nth-of-type(7)',
        56: '.mission-aao:nth-of-type(8)',
        57: '.mission-aao:nth-of-type(9)',
    };
    let called = false;
    function triggerKeyEvent(e) {
        if (called || $('input').is(':focus')) return;
        if (hotkeys[e.keyCode])
            document.querySelector(hotkeys[e.keyCode]).click();

        called = true;
        setTimeout(() => {
            called = false;
        }, 20);
    }
    $('*').keypress(triggerKeyEvent);
})();
