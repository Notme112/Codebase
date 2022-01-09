// ==UserScript==
// @name         VehicleGroups
// @version      1.0.1
// @description  Let you group vehicle and set them to S2 / S.
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    'use strict';
    const data = [
        {
            name: 'Test 1',
            vehicles: [1, 2],
        },
        {
            name: 'Test 2',
            vehicles: [3, 4]
        }
    ]
    function send(v, fms){
        var t = 1;
        const s = [];
        const e = [];
        v.forEach((el) => {
            setTimeout(() => {
                $.ajax({
                    url: "/api/editVehicle",
                    dataType: "json",
                    type : "POST",
                    data: {
                        userVehicleID: el,
                        fms: fms
                    },
                    success : (r) => {
                        s.push(el)
                    },
                    error : (r) => {
                        e.push(el)
                    }
                });
            }, t)
            t = t + 800;
        })
        setTimeout(() => {
            noticeModal('Fahrzeuge in Status ' + fms + ' gesetzt', `Diese Fahrzeuge wurden erfolgreich in Status ${fms} gesetzt:<br> ${s.length ? s.join(', ') : '- keine -'}<br>Bei diesen Fahrzeugen gab es einen Fehler:<br>${e.length ? e.join(', ') : '- keine -'}`);
        }, t+200)
    }
    $('#darkMode').after('<li id="groupVehicle">Reservefahrzeuge</li>');
    $('#groupVehicle').on('click', () => {
        var arr = [];
        data.forEach((el, i) => {
            arr.push({
                text: el.name,
                value: i
            })
        })
        selectModal({
            title: 'Welche Fahrzeuggruppe soll verändert werden?',
            elements: arr
        }).then((group) => {
            selectModal({
                title: 'In welchen Status sollen die Fahrzeuge gesetzt werden?',
                elements:[{
                    text: 'Status 2 (einsatzbereit)',
                    value: 2
                }, {
                    text: 'Status 6 (nicht einsatzbereit)',
                    value: 6
                }]
            }).then((status) => {
                group = parseInt(group);
                arr = data[group].vehicles
                if(parseInt(status) == 2){
                    send(arr, 2)
                }
                if(parseInt(status) == 6){
                    send(arr, 6)
                }
            })
        })
    })
})();
