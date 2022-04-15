// ==UserScript==
// @name         Collapse Cards in Assosiation
// @version      1.0.0
// @description  Collapses cards at association site
// @author       NiZi112
// @match        https://rettungssimulator.online/association/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let autoCollapse = true;
    $('.card-headline').eq(2).html($('.card-headline').eq(2).html() + '<i class="fas fa-angle-up pointer right card-collapse-toggle"></i>').parent().addClass(`card-collapse${autoCollapse ? ' collapsed' : ''}`);
})();
