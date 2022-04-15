// ==UserScript==
// @name         FilterAssociationMembers
// @version      1.0.0
// @description  Filters the association members!
// @author       NiZi112
// @match        https://rettungssimulator.online/association/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
/* global $ */
(function() {
    'use strict';
    $('.card:contains("Verbandsleitung")').after(`<label for="showAbsent">Inaktive Mitglieder anzeigen (funktioniert nur bei (Co-)Admins) <input type="checkbox" id="showAbsent" checked></label><br>
    <label for="showAdmins">(Co-)Admins anzeigen <input type="checkbox" id="showAdmins" checked></label><br>
    <label for="showTeam">Schuldirektoren anzeigen <input type="checkbox" id="showTeam" checked></label><br>
    <label for="showOnline">Online Mitglieder anzeigen <input type="checkbox" id="showOnline" checked></label><br>
    <label for="showOffline">Offline Mitglieder anzeigen <input type="checkbox" id="showOffline" checked></label>`);
    $('input').on('change', (e) => {
        switch($(e.target).attr('id')){
            case 'showAbsent':
                if($(e.target).prop('checked')) $('.toplist-absent').parent().show();
                else $('.toplist-absent').parent().hide();
                break;
            case 'showAdmins':
                if($(e.target).prop('checked')) $('.label-info:contains("Admin")').parent().parent().show();
                else $('.label-info:contains("Admin")').parent().parent().hide();
                break;
            case 'showTeam':
                if($(e.target).prop('checked')) $('.label-info:contains("Schul")').parent().parent().show();
                else $('.label-info:contains("Schul")').parent().parent().hide();
                break;
            case 'showOnline':
                if($(e.target).prop('checked')) $('.toplist-online').parent().show();
                else $('.toplist-online').parent().hide();
                break;
            case 'showOffline':
                if($(e.target).prop('checked')) $('.toplist-offline').parent().show();
                else $('.toplist-offline').parent().hide();
                break;
        };
    })
})();
