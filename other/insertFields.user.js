// ==UserScript==
// @name         insertMissionName.user.js
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Inserts mission names and other stuff!
// @author       NiZi112
// @match        https://rettungssimulator.online/missionNew/*
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==
/* global $ replaceFunc */

(() => {
    let darkMode = true; // true oder false
    let missionNames = ['Name 1', 'Name 2'];
    let missionCities = ['Stadt', 'Dorf'];
    let missionStreets = ['Hauptstraße', 'Nicht-die-Haupstraße'];
    let missionHouseNumbers = ['11a', '12b'];
    let freeText = ['Wir brauchen hier mal nen gebratenes Hänchen..., äh, einen Patienten mit schweren Verbrennungen. Bitte S7 zur Leitstelle!', 'Die Leitstelle brennt! Panik!!1!'];

    function getListFromArray(arrayList, className) {
        let list = '<ul>';
        arrayList.forEach((el) => {
            list += `<li class="${className}">${el}</li>`;
        });
        list += '</ul>';
        return list;
    }

    function buildFrameContent() {
        return `<h2>Einsatznamen:</h2>
        ${getListFromArray(missionNames, 'missionName')}
        <h2>Straßen:</h2>
        ${getListFromArray(missionStreets, 'street')}
        <h2>Hausnummern:</h2>
        ${getListFromArray(missionHouseNumbers, 'houseNumber')}
        <h2>Orte:</h2>
        ${getListFromArray(missionCities, 'city')}
        <h2>Freitexte:</h2>
        ${getListFromArray(freeText, 'freeText')}<br>`
    }

    function openWindow() {
        let newWindow;
        if ((newWindow == null) || (newWindow.closed) || (!newWindow)) {
            newWindow = window.open('', "Intelligenter Helfer für alles Mögliche",
                                    "width=400,height=300,resizable=yes,status=no," +
                                    "menubar=no,location=no,scrollbars=no,toolbar=no,top=100,left=20");
            newWindow.opener = top;
            newWindow.focus();
        } else {
            newWindow.focus();
        }
        window.addEventListener('unload', () => {
            newWindow.close();
        })
        newWindow.document.head.innerHTML = `<title>Stichworte ReSi</title><link rel="stylesheet" href="https://rettungssimulator.online/css/index.css"></link><link rel="shortcut icon" href="https://rettungssimulator.online/images/favicons/favicon.ico"></link>>`;
        newWindow.document.body.innerHTML = buildFrameContent();
        if(darkMode) newWindow.document.body.classList.add('dark');
        $('.missionName', newWindow.document).on('click', (e) => {
            $('#newMissionNameInput').val(replaceFunc($(e.target).text()));
        })
        $('.street', newWindow.document).on('click', (e) => {
            $('#newMissionRoadInput').val(replaceFunc($(e.target).text()));
        })
        $('.houseNumber', newWindow.document).on('click', (e) => {
            $('#newMissionHousenumberInput').val(replaceFunc($(e.target).text()));
        })
        $('.city', newWindow.document).on('click', (e) => {
            $('#newMissionCityInput').val(replaceFunc($(e.target).text()));
        })
        $('.freeText', newWindow.document).on('click', (e) => {
            $('#newMissionCustomText').val(replaceFunc($(e.target).text()));
        })
    }
    $('body').append(`<script>
        function replaceFunc(text){
          text = text.replace(/%text%/g, $("#newMissionCustomText").val());
          text = text.replace(/%ort%/g, $("#newMissionCityInput").val());
          text = text.replace(/%straße%/g, $("#newMissionRoadInput").val());
          text = text.replace(/%nummer%/g, $("#newMissionHousenumberInput").val());
          text = text.replace(/%name%/g, $("#newNameInput").val());
          text = text.replace(/%stichwort%/g, $("#newMissionNameInput").val());
          return text;
        };
        </script>`)
    $('.frame-close').before(`<button style="margin-left:10px;" class="right button button-success button-round openWindow">Einsatzstichworte</button>`);
    $('.openWindow').on('click', openWindow)
    openWindow();
})()