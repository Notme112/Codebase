// ==UserScript==
// @name         Improved AAO movement
// @version      1.0.0
// @description  🚒
// @author       NiZi112
// @match        https://rettungssimulator.online/aaoEdit/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
/* global aao $ arraymove */

(function() {
    'use strict';
    const MOVING_STEPS = 5;
    $('.aao-set-order')
        .prepend('<span class="move-more-forward"><i class="fa fa-chevrons-left" style="padding-right:2px;"></i></span>')
        .append('<span class="move-more-backward"><i class="fa fa-chevrons-right"  style="padding-left:2px;"></i></span>')
        .css('width', '100px')
    $('.move-more-forward').on('click', (t) => {
        for(let i = 0; i < MOVING_STEPS; i++){
            $(t.target).next().click();
        }
    })
    $('.move-more-backward').on('click', (t) => {
        for(let i = 0; i < MOVING_STEPS; i++){
            $(t.target).prev().click();
        }
    });
})();
