// ==UserScript==
// @name         Search in mission overview
// @namespace    seachMissionOverview.nizi112.rettungssimulator
// @version      1.0.0
// @description  Addes a search to /missionOverview
// @author       NiZi112
// @match        https://rettungssimulator.online/missionOverview*
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $('.detail-subtitle:first').append(`<div class="input-container right"><input class="input-round input-inline nochange" type="text" value="" style="padding-left:10px;" id="input_search" placeholder="Suche..." autocomplete="off"></div>`)
    $('.detail-header').after(`<h4 class='label label-info searchNoResult hidden'>Die Suche lieferte keine Ergebnisse! Bitte probiere es mit einem anderen Suchwort!</h4>`)
    $('head').append(`<style>.searchHidden { display: none !important };</style>`)
    let query = 'table tbody tr';
    function search() {
        var searchWord = document.querySelector('#input_search').value.toLowerCase();
        if (searchWord == '') {
            document.querySelectorAll(query).forEach((el) => {
                el.classList.remove('searchHidden');
                document.querySelector('.searchNoResult').classList.add('hidden');
            });
            return;
        }
        let elems = document.querySelectorAll(query);
        for (var j = 0; j < document.querySelectorAll(query).length; j++) {
            if (elems[j].querySelectorAll('td')[1].innerText.toLowerCase().includes(searchWord) || elems[j].querySelectorAll('td')[1].innerText.toLowerCase().includes(searchWord)) {
                elems[j].classList.remove('searchHidden');
                document.querySelector('.searchNoResult').classList.add('hidden');
            } else {
                elems[j].classList.add('searchHidden')
            }
        }
        if (elems.length == document.querySelectorAll('.searchHidden td').length) {
            document.querySelector('.searchNoResult').classList.remove('hidden');
        }
    };
    $('#input_search').on('input change keyup', search);
})();
