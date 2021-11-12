// ==UserScript==
// @name         Mapmode
// @version      1.0.0
// @description  Erweitert das Spiel um einen Mapmodus (große Karte)
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    'use strict';
    function toggleBigMap(){
        setTimeout(function(){
            toggleMap();
        }, 1000)
        $('header').remove();
    };
    if(window.location.href.endsWith('#map=true') || window.location.href.endsWith('&map=true') || window.location.href.includes('#map=true') || window.location.href.includes('&map=true')){
        $(document).ready(toggleBigMap)
    }else{
        $('#ad').append('<a href="https://rettungssimulator.online#map=true" class="button button-success button-round no-prevent" target="_blank">Karte in großem Fenster öffnen</a>')
    };
})();
