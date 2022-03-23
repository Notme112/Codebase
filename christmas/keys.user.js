// ==UserScript==
// @name         KeysInMission
// @version      1.0.0
// @description  Erlaubt es,
// @author       You
// @match        https://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
/* global $ */

(function() {
    'use strict';
    var called = false;
    function triggerKeyEvent(e){
        if(called || $('input').is(":focus")) return;
        if(e.keyCode === 120){
            $('.alarming-submit').click();
        }else if(e.keyCode === 121){
            $('.alarming-submit-close').click();
        }else if(e.keyCode === 49){
            $('.mission-aao').eq(0).click();
        }else if(e.keyCode === 50){
            $('.mission-aao').eq(1).click();
        }else if(e.keyCode === 51){
            $('.mission-aao').eq(2).click();
        }else if(e.keyCode === 52){
            $('.mission-aao').eq(3).click();
        }else if(e.keyCode === 53){
            $('.mission-aao').eq(4).click();
        }else if(e.keyCode === 54){
            $('.mission-aao').eq(5).click();
        }else if(e.keyCode === 55){
            $('.mission-aao').eq(6).click();
        }else if(e.keyCode === 56){
            $('.mission-aao').eq(7).click();
        }else if(e.keyCode === 57){
            $('.mission-aao').eq(8).click();
        };
        called = true;
        setTimeout(function(){
            called = false;
        }, 20);
    };
    $('*').keypress(triggerKeyEvent);
})();
