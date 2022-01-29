// ==UserScript==
// @name         ShowNAChance
// @version      1.0.0
// @description  Shows the NA-Chance at a mission
// @author       NiZi112
// @match        https://rettungssimulator.online/mission/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    getAPI = async function (name) {
        if (
            !sessionStorage.getItem(`a${name}`) || JSON.parse(sessionStorage.getItem(`a${name}`)).lastUpdate > (new Date).getTime() * 1000 * 60 * 5
        ) {
            return new Promise((res) => {
                $.ajax({
                    url: `/api/${name}`,
                    dataType: 'json',
                    type: 'GET',
                    error: (e) => {
                        noticeModal('Error', `Es ist ein Fehler bei einem GET einer API aufgetreten<br>Script: ${GM_info.script.name}<br>Version: ${GM_info.script.version} <br>Autor: ${GM_info.script.author}`);
                        console.error(`Error while fetching API ${name}:`);
                        console.error(e);
                        res('Error')
                    },
                    success: (r) => {
                        sessionStorage.setItem(`a${name}`, JSON.stringify({
                            value: r,
                            lastUpdate: (new Date).getTime()
                        }))
                        res(r)
                    }
                })
            })
        } else {
            return new Promise((res) => {
                res(JSON.parse(sessionStorage.getItem(`a${name}`)).value);
            })
        }
    }
    const api = await getAPI('missions')
    console.log(api)
    const data = api[parseInt($('.detail-title').attr('missionid'))]
    if(data.patients){
        $('#s5').after(`<span class='label label-info'>Grundvariante: ${data.patients.min}-${data.patients.max} Patienten, ${data.patients.naChance}\% NA-Wahrscheinlichkeit`)
    }
    console.log(data)
})();
