// ==UserScript==
// @name         Hides VehicleTypes in new AAO
// @version      1.0.1
// @description  nobody knows
// @author       NiZi112
// @match        https://rettungssimulator.online/aaoEdit/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    let hidden = []; //as sample:'lf', 'hlf', 'lpol', 'bpol', 'tlf'
    function hideAll(){
        document.querySelectorAll('option').forEach((e) => {
            if(hidden.includes(e.getAttribute('value'))) {
                e.remove();
            }
        });
    }
    hideAll();
    $('.aao-edit-vehicle-add, .aao-edit-new').on('click', hideAll)
})();
