GM_info = {
    script: {
        version: 'ALPHA',
        name: 'ReSi-Codebase DEV'
    }
};
//*** => CODEBASE <= ***//
// ==UserScript==
// @name         ReSi-Codebase BETA
// @version      1.5.0
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @include      www.rettungssimulator.online
// @match        https://rettungssimulator.online/vehicle/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/Notme112/Codebase/raw/main/code.user.js
// @downloadURL  https://github.com/Notme112/Codebase/raw/main/code.user.js
// @grant        none
/* global $ sounds openFrame socket systemMessage */
// ==/UserScript==

(async function () {
    if(localStorage.resiBaseRemovedStorage != '1.5.0'){
        localStorage.removeItem('storage_resi_base');
        localStorage.resiBaseRemovedStorage = '1.5.0';
    }
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

    function validate(text) {
        return text.replace('<', '').replace('>', '');
    }
    const css = `
    <style>
    .codebase:focus{
      outline: none;
    }
    </style>`;
    const head = document.head || $("head:first");
    $(head).append(css);
    let storage;
    //Start Storage-Abfrage
    if (!localStorage.getItem('storage_resi_base')) {
        localStorage.setItem(
            'storage_resi_base',
            JSON.stringify({
                toplist: false,
                gesamtmuenzen: false,
                einsatzzealer: false,
                einsatzliste_max: false,
                flogout: false,
                autocomplete: false,
                streamer: false,
                sounds: false,
                einsatzzaeler: false,
                chat_alarm: false,
                push_fms: false,
                zeitwechsel: false,
                uhr: false,
                settings: false,
                chat_count: false,
                alert_chat: false,
                greet_user: false,
                filterKH: false,
                audio: {
                    finish: "",
                    fms: "",
                    fms5: "",
                    error: "",
                    newCall: "",
                    chatMessage: ""
                },
                darkmodeSettings: {
                    min: 7,
                    max: 19
                },
                filterKHSettings: {
                    ownKH: true,
                    alliKH: true,
                    maxDistanceKH: 10
                },
                text: {
                    stream_mode: "Es handelt sich um ein Spiel mit fiktiven Einsätzen."
                }
            })
        );
        systemMessage({
            title: 'Willkommen bei der ReSi-Codebase!',
            message: `Schön, dass Du dich entschlossen hast, die ReSi-Codebase zu nutzen!<br><br>
            Du kannst jeden Modul einzeln aktivieren, die Möglichkeit findest Du in einem Einstellungs-Panel, welches Du über die Seitenleiste aufrufen kannst.<br>
            Probier doch einfach mal alle Module aus. Wenn Du nicht weißt, was ein Modul tut, dann klick einfach auf das [?] hinter dem Namen, damit kommst Du zur Wikiseite des Moduls.<br><br>
            Fehler bitte im Forum melden - oder im Thread ReSi-Codebase auf Discord im Bereich <code>#skripting</code><br><br>
            Viel Spaß,<br>
            Dein Team der ReSi-Codebase`,
            type: 'info'
        });
    }
    const s = JSON.parse(localStorage.storage_resi_base);

    try {
        if ($('#darkMode').html().includes('Tag'))
            localStorage.setItem('darkmode_resi_base', 'true');
        else localStorage.setItem('darkmode_resi_base', 'false');
    } catch {
        console.error('Darkmode-Button nicht gefunden');
    };

    $('#darkMode').on('click', () => {
        if (localStorage.getItem('darkmode_resi_base') == 'true')
            localStorage.setItem('darkmode_resi_base', 'false');
        else localStorage.setItem('darkmode_resi_base', 'true');
    });
    /*{
        subtarget: "",
        target: "gesamtmuenzenSetting1",
        name: "Testsettings",
        type: "checkbox",
        settingsKey: "testsettings",
        preset: "URL"
    }*/
    const modules = [{
            name: "Gesamtmünzenzähler",
            description: "Zeigt in der Seitenleiste die gesamt verdienten Münzen an.",
            settingsTarget: "gesamtmuenzen",
            helpLink: "",
            target: "gesamtmuenzenCheck",
            func: async (s) => {
                const r = await getAPI('user');
                $('#darkMode').after(
                    `<li>${r.muenzenTotal.toLocaleString()} Münzen</li>`
                );
            },
            keywords: ['Münzen', 'Gesamtmünzen', 'Zahl', 'Zähler', 'verdient'],
            hasSettings: false,
            allSite: false,
            settings: [],
        },
        {
            name: "Toplist-Position",
            description: "Zeigt in Seitenleiste im Toplist-Link direkt die aktuelle Position auf der Topliste.",
            helpLink: "",
            settingsTarget: "toplist",
            target: "toplistCheck",
            keywords: ['Toplist', 'Toplist-Position', 'Position', 'Topliste', 'Toplisten-Position'],
            allSite: false,
            func: async (s) => {
                const res = await getAPI('user')
                $('.dropdown-content li').eq(2).html(`Topliste: ${res.toplistRank}`);
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Maximierte Einsatzliste",
            description: "Maximiert die Einsatzliste dauerhaft.",
            helpLink: "",
            settingsTarget: "einsatzlisteMax",
            target: "maxMissionlistCheck",
            keywords: ['erweitert', 'Einsatzliste', 'erweiterte Einsatzliste', 'maximiert', 'maximierte Einsatzliste'],
            allSite: false,
            func: async (s) => {
                $('#missions .panel-expand').children().eq(0).click();
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Flogout (Fast Logout)",
            description: "Zeigt direkt oben links am Rand ein Logout-Symbol",
            helpLink: "",
            settingsTarget: "flogout",
            target: "flogoutCheck",
            keywords: ['FastLogout', 'Logout', 'Fast', 'Logout', 'scneller', 'Logout'],
            allSite: false,
            func: async (s) => {
                const platz = document.getElementsByClassName('brand-img')[0];
                platz.style.display = 'inline';
                platz.style.paddingRight = '20px';
                platz.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
                platz.addEventListener('click', () => {
                    $.ajax({
                        url: '/api/deauthenticate',
                        type: 'GET',
                        success() {
                            window.location.reload();
                        },
                    });
                });
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Eigener Streammode-Text",
            description: "Zeigt statt dem Chat euren eigenen Text an",
            helpLink: "",
            settingsTarget: "streammode",
            target: "streammodeCheck",
            keywords: ['Streamer', 'Youtube', 'Streammode-Text', 'Streammode', 'Streamer-Modus', 'Twitch', 'YT'],
            allSite: false,
            func: async (s) => {
                $("#chat").html(s.text.stream_mode ? s.text.stream_mode : '');
                document.getElementById("chat").style.padding = "15px";
            },
            hasSettings: true,
            settings: [{
                subtarget: "text",
                target: "streamerText",
                name: "Text",
                type: "input-text",
                settingsKey: "stream_mode",
                preset: "TEXT"
            }],
        },
        {
            name: "Eigene Sounds",
            description: "Erlaubt euch, eigene Sounds in das Spiel zu bringen",
            helpLink: "",
            settingsTarget: "ownSound",
            target: "ownSoundCheck",
            keywords: ['Streamer', 'Youtube', 'Streammode-Text', 'Streammode', 'Streamer-Modus'],
            allSite: false,
            func: async (s) => {
                sounds.radioFMS = new Audio(s.audio.fms ? s.audio.fms : '');
                sounds.newCall = new Audio(s.audio.newCall ? s.audio.newCall : '');
                sounds.fms5 = new Audio(s.audio.fms5 ? s.audio.fms5 : '');
                sounds.finishedMission = new Audio(s.audio.finish ? s.audio.finish : '');
                sounds.error = new Audio(s.audio.error ? s.audio.error : '');
            },
            hasSettings: true,
            settings: [{
                subtarget: "audio",
                target: "newCallAudio",
                name: "Neuer-Anruf-Sound",
                type: "input-text",
                settingsKey: "newCall",
                preset: "URL"
            }, {
                subtarget: "audio",
                target: "fmsAudio",
                name: "FMS-Sound",
                type: "input-text",
                settingsKey: "fms",
                preset: "URL"
            }, {
                subtarget: "audio",
                target: "fms5Audio",
                name: "FMS5-Sound",
                type: "input-text",
                settingsKey: "fms5",
                preset: "URL"
            }, {
                subtarget: "audio",
                target: "errorAudio",
                name: "Error-Sound",
                type: "input-text",
                settingsKey: "error",
                preset: "URL"
            }, {
                subtarget: "audio",
                target: "finischAudio",
                name: "Einsatz-abgeschlossen-Sound",
                type: "input-text",
                settingsKey: "finish",
                preset: "URL"
            }],
        },
        {
            name: "Autocomplete verhindern",
            description: "Verhindert den Autocomplete des Brwosers bei den Feldern der Einsatzannahme und des Chats",
            helpLink: "",
            settingsTarget: "autocomplete",
            target: "autocompleteCheck",
            keywords: ['Browser', 'complete', 'verhindern', 'autocomplete'],
            allSite: false,
            func: async (s) => {
                $('#chatInput').attr('autocomplete', 'off');
                $('#newMissionNameInput').attr('autocomplete', 'off');
                $('#newNameInput').attr('autocomplete', 'off');
                $('#newMissionRoadInput').attr('autocomplete', 'off');
                $('#newMissionHousenumberInput').attr('autocomplete', 'off');
                $('#newMissionCityInput').attr('autocomplete', 'off');
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Einsatzzähler",
            description: "Zeigt in Seitenleiste die Zahl der heute absolvierten Einsätze.",
            helpLink: "",
            settingsTarget: "einsatzzaehler",
            target: "einsatzzeahlerCheck",
            keywords: ["Einsatz", "Zahl", "Zähler", "zählen", "Einsatze", "zählen"],
            allSite: false,
            func: async (s) => {
                var datum = new Date();
                var datum_heute = datum.getDate()
                if (!localStorage.getItem("finished_missions_nizi")) {
                    localStorage.setItem("finished_missions_nizi", "0")
                };
                if (!localStorage.getItem("finished_missions_nizi_time")) {
                    localStorage.setItem("finished_missions_nizi_time", datum_heute)
                };
                if (localStorage.getItem("finished_missions_nizi_time") != datum_heute) {
                    localStorage.setItem("finished_missions_nizi", "0")
                };
                if (localStorage.getItem("finished_missions_nizi_time") != datum_heute) {
                    localStorage.setItem("finished_missions_nizi_time", datum_heute)
                };
                var neue_liste = document.createElement("li");
                var hallo = $("#darkMode")
                neue_liste.innerHTML = "Einsätze heute: " + localStorage.getItem("finished_missions_nizi");
                hallo.after(neue_liste);
                socket.on("finishMission", (userMissionID) => {
                    var mission = localStorage.getItem("finished_missions_nizi");
                    mission++;
                    localStorage.setItem("finished_missions_nizi", mission);
                    neue_liste.innerHTML = "Einsätze heute: " + mission;
                });
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Push FMS5",
            description: "Sendet eine Brwoserbenachrichtigung bei einem Sprechwunsch.",
            helpLink: "",
            settingsTarget: "pushFMS",
            target: "pushFMSChack",
            keywords: ['Browserbenachrichtigung', 'Browser', 'Push', 'Ping', 'PushFMS', 'FMS', 'Status', '5', 'Sprechwunsch'],
            allSite: false,
            func: async (s) => {
                function notifyMe() {
                    if (Notification.permission === "granted") {
                        var news = true;
                    } else if (Notification.permission !== 'denied') {
                        Notification.requestPermission(function (permission) {
                            if (permission === "granted") {
                                news = true;
                            }
                        });
                    }
                }
                notifyMe();

                socket.on("vehicleFMS", (vehicleFMSObject) => {
                    var hallo = `${vehicleFMSObject.userVehicleFMS}`;
                    if (hallo.includes("5")) {
                        new Notification("Sprechwunsch!", {
                            body: `Dein Fahrzueg ${vehicleFMSObject.userVehicleName} im Rettungssimulator hat einen Sprechwunsch!`
                        });
                    }
                });
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Darkmode nach Uhrzeit (noch nicht verfügbar)",
            description: "Wechselt automatisch in den White- / Darkmode bei von euch bestimmter Einstellung",
            helpLink: "",
            settingsTarget: "zeitwechsel",
            target: "darkModeCheck",
            keywords: ['Darkmode', 'Uhrzeit', 'automatisch'],
            allSite: true,
            func: async (s) => {
                console.log("Ich zähle die Topliste");
            },
            hasSettings: true,
            settings: [{
                    subtarget: "darkmodeSettings",
                    target: "uhrMin",
                    name: "Darkmode um ... Uhr ausschlaten",
                    type: "input-number",
                    settingsKey: "min",
                    preset: "URL"
                },
                {
                    subtarget: "darkmodeSettings",
                    target: "uhrMax",
                    name: "Darkmode um ... Uhr einschalten",
                    type: "input-number",
                    settingsKey: "max",
                    preset: "URL"
                }
            ],
        },
        {
            name: "Uhr",
            description: "Zeigt in der Navbar eine kleine Uhr.",
            helpLink: "",
            settingsTarget: "uhr",
            target: "uhrCheck",
            keywords: ["Uhr", "Zeit", "Uhrzeit", "Navbar"],
            allSite: false,
            func: async (s) => {
                var hallo = document.createElement("div");
                document.getElementsByClassName("brand")[0].after(hallo);
                $("#darkMode").after("<li>Icons by Fontawesome<br>unter CC-BY</li>");
                var aktualisieren = function () {
                    var date = new Date();
                    var stunde = date.getHours();
                    var minute = date.getMinutes();
                    var sekunde = date.getSeconds();
                    if (sekunde < 10) {
                        sekunde = "0" + sekunde
                    };
                    if (minute < 10) {
                        minute = "0" + minute
                    };
                    hallo.innerHTML = stunde + ":" + minute + ":" + sekunde + " <i class='far fa-clock'></i>";
                };
                setInterval(aktualisieren, 50)
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Settings in der Navbar",
            description: "Die Codebase-Einstellungen lassen sich so auch direkt über die Navbar aufrufen.",
            helpLink: "",
            settingsTarget: "settings",
            target: "settingsCheck",
            keywords: ["schnell", "Zugriff", "Einstellungen", "Navbar"],
            allSite: false,
            func: async (s) => {
                //
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Chat-Count",
            description: "Zählt die Zeichen im Chat.",
            helpLink: "",
            settingsTarget: "chatCount",
            target: "chatCountCheck",
            keywords: ["Chat", "zählen", "Zeichen", "maximale", "Zeichen", "Zeichen", "zählen"],
            allSite: false,
            func: async (s) => {
                function countCharackters() {
                    var charackters = $("#chatInput").val().length;
                    if (charackters < 10) {
                        charackters = "00" + charackters
                    } else if (charackters < 100) {
                        charackters = "0" + charackters
                    } else {
                        charackters = charackters
                    };
                    $("#chracktarsChatCount").html(charackters);
                    if (charackters > 300) {
                        $("#chracktarsChatCount").addClass("label-danger");
                        $("#chracktarsChatCount").removeClass("label-success");
                    } else {
                        $("#chracktarsChatCount").addClass("label-success");
                        $("#chracktarsChatCount").removeClass("label-danger");
                    }
                };
                const c = $('#new-chat-jump-to');
                const old = c.html()
                $('#chatInput').on('keyup focus', () => {
                    c.html(old + '&nbsp;<span class="label label-success" id="chracktarsChatCount" style="width: 12%">000</span>')
                    showJumpToNewChat()
                    countCharackters()
                })
                $('#chatInput').on('focusout submit', () => {
                    c.html(old);
                    hideJumpToNewChat()
                })
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "AlertChat",
            description: "Sendet kleine Popups bei einer Chatnachricht.",
            helpLink: "",
            settingsTarget: "alertChat",
            target: "alertChatCount",
            keywords: ["Popup", "Sytemnachricht", "Nachricht", "Benachrichtgung"],
            allSite: false,
            func: async (s) => {
                socket.on("associationMessage", (msg) => {
                    if (msg.message && msg.userName != $(".username .frame-opener").html()) {
                        systemMessage({
                            'title': `${msg.userName}`,
                            'message': `${msg.message}`,
                            'type': 'info'
                        });
                    }
                });
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "FilterKH",
            description: "Filtert die Krankenhäuser in einem Sprechwunsch.",
            helpLink: "",
            settingsTarget: "filterKH",
            target: "filterKHCheck",
            keywords: ["Filter", "Krankenhäuser", "Sprechwunsch", "FMS5", "S5"],
            allSite: true,
            func: async (s) => {
                if ($('.s5').length > 0 && location.pathname.includes('vehicle')) {
                    var val = s.filterKHSettings.maxDistanceKH;
                    var own = s.filterKHSettings.ownKH;
                    var alli = s.filterKHSettings.alliKH;
                    console.log(own, alli, val);

                    var active = s.filterKHActive;

                    $('.card:first').after(`<button class='button button-round button-danger' id='changeFilterKHMode'>Filter aktivieren</button>`)

                    function addFilter() {
                        for (var i = 1; i < $('.pointer').length + 1; i++) {
                            var j = 1 + (i * 2) - 1;
                            var entf = parseInt($('.box-text').eq(j).text().replace(' km', ''));
                            if (entf < val) {
                                if ($('.box-progress').eq(i).html().includes('<span class="label label-info label-round text-small">VERBAND</span>')) {
                                    if (alli) {
                                        $('.box-progress').eq(i).show();
                                    } else {
                                        $('.box-progress').eq(i).hide();
                                    }
                                } else if (own) {
                                    $('.box-progress').eq(i).show();
                                } else {
                                    $('.box-progress').eq(i).hide();
                                };
                            } else {
                                $('.box-progress').eq(i).hide();
                            }
                        }
                    }

                    function removeFilter() {
                        $('.box-progress').show();
                    };

                    $('#changeFilterKHMode').on('click', function () {
                        if ($('#changeFilterKHMode').hasClass('button-danger')) {
                            addFilter();
                            $('#changeFilterKHMode').removeClass('button-danger');
                            $('#changeFilterKHMode').addClass('button-success');
                            $('#changeFilterKHMode').text('Filter aktiviert');
                            s.filterKHActive = true;
                        } else {
                            removeFilter();
                            $('#changeFilterKHMode').removeClass('button-sucsess');
                            $('#changeFilterKHMode').addClass('button-danger');
                            $('#changeFilterKHMode').text('Filter deaktiviert');
                            s.filterKHActive = false;
                        }
                        localStorage.storage_resi_base = JSON.stringify(s)
                    });

                    if (active) {
                        $('#changeFilterKHMode').click();
                    }
                } else {
                    return;
                };
            },
            hasSettings: true,
            settings: [{
                subtarget: "filterKHSettings",
                target: "ownKH",
                name: "Eigene Krankenhäuser anzeigen",
                type: "checkbox",
                settingsKey: "ownKH",
                preset: "CHECKBOX"
            }, {
                subtarget: "filterKHSettings",
                target: "alliKH",
                name: "Verbandskrankenhäuser anzeigen",
                type: "checkbox",
                settingsKey: "alliKH",
                preset: "CHECKBOX"
            }, {
                subtarget: "filterKHSettings",
                target: "maxDistanceKH",
                name: "Maximale Entfernung der Krankenhäuser",
                type: "input-number",
                settingsKey: "maxDistanceKH",
                preset: "ZAHL"
            }],
        },
    ]
    //Ende Storage-Abfrage
    //Start eigener Frame
    const listenelement = document.createElement('li');
    $('#darkMode').after(listenelement);
    listenelement.innerHTML = 'ReSi-Codebase';
    listenelement.id = 'Codebase'
    if (s.settings) $(".brand").after(`<i class="fas fa-cogs codebase" focusable="false" data-tooltip="ReSi-Codebase-Einstellungen" onclick="$('#Codebase').click()"></i>`);
    $(listenelement).on('click', () => {
        openFrame('', '1/1/4/5');
        const frame = $('#iframe');
        frame.on('load', () => {
            var frameContent = `<div class='panel-body'>
            <script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script>
            <link rel='stylesheet' href='https://rettungssimulator.online/css/index.css' charset='utf-8'>
            <script src='https://rettungssimulator.online/js/index.js'></script>
            <script src='https://rettungssimulator.online/js/iframe.js'></script>
            <script src='https://rettungssimulator.online/js/controlCenter.js'></script>
            <script src="https://rettungssimulator.online/js/popper.js" charset="utf-8"></script>
            <script src='https://rettungssimulator.online/js/tippy.js'></script>
            <style>
            .searchHidden{
              display: none;
            };
            </style>
            <script>
            if(localStorage.getItem('darkmode_resi_base')=='true'){document.getElementsByTagName('body')[0].classList.add('dark');}
            var changes = false;
            $('.checkbox-container').on('click', function(){
              if(!$(this).hasClass('nochange')){
                changes = true;
              }
            })
            $('.input-round').on('keydown', function(){
              if(!$(this).hasClass('nochange')){
                changes = true;
              }
            })
            function valide (value) { value = value.replaceAll('>', ''); value = value.replaceAll('<', ''); return value; }
            $('body').on('keyup', function(e){if(e.keyCode===27){$(".right").click();}});
            function search(){
              var searchWord = $('#input_search').val().toLowerCase();
              if(searchWord == ''){
                $('.searchable').removeClass('searchHidden');
                $('.searchNoResult').addClass('hidden');
                return;
              }
              for(var j = 0; j <= $('.searchable').length; j++){
                if($('.searchable').eq(j).text().toLowerCase().includes(searchWord)){
                  $('.searchable').eq(j).removeClass('searchHidden');
                  $('.searchNoResult').addClass('hidden');
                }else{
                  $('.searchable').eq(j).addClass('searchHidden');
                }
              }
              if($('.searchable').length == $('.searchHidden').length){
                $('.searchNoResult').removeClass('hidden');
              }
            };
            $('#input_search').on('input', search);
            $('#input_search').on('change', search);
            $('#input_search').on('keyup', search);
            </script>
            <div class='detail-header'>
            <div class='detail-title'>ReSi-Codebase <div class='right pointer' onclick='if(changes === true){modal("Ohne Speichern verlassen?","Du hast Änderungen vorgenommen, willst du diese Seichern?","Speichern","Ohne speichern verlassen",() => {$("#saveCodebaseSettings").click()}, () => {parent.closeFrame()})}else{parent.closeFrame()}'> &times; </div></div>
            <div class='detail-subtitle'>Verwalte hier deine Einstellungen für die ReSi-Codebase
            <div class="input-container nochange" style="float:right"><label for='input_search'>Suche</label>
            <input class="input-round input-inline nochange" type="text" value="" style="padding-left:20px;padding-right:20px;" id="input_search" placeholder="Suche..." autocomplete="off">
            </div>
            </div>
            </div>
            <div class='tabs tabs-horizotal'>
            <div class='tab tab-active' for='settings-moduls'>Module</div>
            <div class='tab' for='settings-inputs'>Texte & URL's</div>
            <div class='tab' for='licence'>Sonstiges & Lizenzen</div>
            </div>
            <div class='tab-container'>
            <div class='tab-content tab-content-active' id='tab_settings-moduls'>
            <h2>Module:</h2>
            <h4 class='label label-info searchNoResult hidden'>Die Suche lieferte keine Ergebnisse! Bitte probiere es mit einem anderen Suchwort!</h4>`;
            modules.forEach((el) => {
                frameContent += `<div class='checkbox-container searchable'><input id='${el.target}' type='checkbox' ${s[el.settingsTarget] ? 'checked' : ''}><label for='${el.target}'>${el.name} aktivieren<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></label><div class='hidden keyword-serach'>${el.keywords.join(' ')}</div></div>`
            });
            frameContent += `<button class='button-success button button-round' onclick='$("#saveCodebaseSettings").click()'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_settings-inputs'>
            <h2>Texte & URL's:</h2>`
            modules.forEach((el) => {
                if (el.hasSettings) {
                    frameContent += `<h3>${el.name}</h3>
                    <h4 class='label label-info searchNoResult hidden'>Die Suche lieferte keine Ergebnisse! Bitte probiere es mit einem anderen Suchwort!</h4>`
                    el.settings.forEach((setting) => {
                        var value = setting.subtarget ? s[setting.subtarget][setting.settingsKey] : s[setting.settingsKey];
                        switch (setting.type) {
                            case 'checkbox':
                                frameContent += `<div class='checkbox-container searchable'><input id='${setting.target}' ${value ? 'checked' : ''} type='checkbox'><label for='${setting.target}'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></label></div>`
                                break;
                            case 'input-text':
                                frameContent += `<div class='input-container searchable'><div class='input-label'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></div><div class='input-icon'></div><input class='input-round' value='${value ? value : ''}' autocomplete='off' id='${setting.target}' placeholder='${setting.preset}'></div>`
                                break;
                            case 'input-number':
                                frameContent += `<div class='input-container searchable'><div class='input-label'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></div><div class='input-icon'></div><input class='input-round' type='number' value='${value ? value : ''}' autocomplete='off' id='${setting.target}' placeholder='${setting.preset}'></div>`
                                break;
                            default:
                                frameContent += `<div class='alert alert-info'>Unbekannte Einstellungsmöglichkeit ${setting.type} @ ${el.name}</div>`
                                break;
                        }
                    })
                }
            })
            frameContent += `<br>
            <button class='button-success button button-round' id='saveCodebaseSettings'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_licence'>
            <h2>Fehler melden:</h2>
            <p>
            <a href='https://github.com/Notme112/Codebase/issues/new?assignees=NiZi112&labels=bug&template=bugs---fehler.md&title=BUG%3A+' class='no-prevent button button-success button-round' target='_blank'>Github</a> - <a href='https://forum.rettungssimulator.online/index.php?thread/1423-resi-codebase-v1-0/&action=lastPost' class='no-prevent button button-success button-round' target='_blank'>Forum</a> - Discord: im Thread ReSi-Codebase im Bereich <code>#skripting</code>
            <h3>Vielen Danke für deine Mithilfe!</h3>
            </p>
            <h2>Open-Source:</h2>
            <p>
            Icons:
            Icons by <a href='https://fontawesome.com/' target='_blank' class='no-prevent'><u>Fontawesome</u></a> unter <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank'><u>CC-BY 4.0-Lizenz</u></a>.
            </p>
            <p>
            JQuery:
            Copyright (c) 2021 OpenJS Foundation and other contributors, https://openjsf.org/, <br>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            <br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>
            THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            </p>
            </div>
            </div>
            <h3>Danke für die Nutzung der ReSi-Codebase!</h3>
            </div>`
            frame.contents().find('body').append(frameContent);

            function saveCodebaseSettings() {
                modules.forEach((el) => {
                    s[el.settingsTarget] = $('#iframe').contents().find(`#${el.target}`).prop('checked');
                    if (el.hasSettings) {
                        el.settings.forEach((setting) => {
                            switch (setting.type) {
                                case 'checkbox':
                                    if (setting.subtarget) {
                                        s[setting.subtarget][setting.settingsKey] = $('#iframe').contents().find(`#${setting.target}`).prop('checked');
                                    } else {
                                        s[setting.settingsKey] = $('#iframe').contents().find(`#${setting.target}`).prop('checked');
                                    }
                                    break;
                                case 'input-text':
                                    if (setting.subtarget) {
                                        validate(s[setting.subtarget][setting.settingsKey] = $('#iframe').contents().find(`#${setting.target}`).val());
                                    } else {
                                        validate(s[setting.settingsKey] = $('#iframe').contents().find(`#${setting.target}`).val());
                                    }
                                    break;
                                case 'input-number':
                                    if (setting.subtarget) {
                                        s[setting.subtarget][setting.settingsKey] = parseFloat($('#iframe').contents().find(`#${setting.target}`).val());
                                    } else {
                                        s[setting.settingsKey] = parseFloat($('#iframe').contents().find(`#${setting.target}`).val());
                                    }
                                    break;
                                default:
                                    console.error(`Can't save setting ${setting.name} @ ${el.name} with target ${el.target} to storage @ subcategory ${setting.subtarget} and category ${setting.settingsKey} with type ${setting.type}`);
                            }
                        })
                    }
                })
                localStorage.storage_resi_base = JSON.stringify(s)
                reload()
            }
            $('#iframe').contents().find('#saveCodebaseSettings').on('click', saveCodebaseSettings)
            frame.off('load');
        });
    });
    //Ende eigener Frame
    //Start function-definding
    //Ende function-definding
    //Start ausführen
    modules.forEach(async (el) => {
        try {
            if (s[el.settingsTarget]) {
                if (location.pathname != "/" && el.allSite) {
                    await el.func(s);
                }
                if (location.pathname == "/") {
                    await el.func(s);
                }
            }
        } catch (e) {
            console.log(e)
            console.error(`Fehler im Modul ${el.name}`)
        }
    })
    if (window.location.pathname == '/') {
        var log = `Running ${GM_info.script.name} in Version ${GM_info.script.version} on site ${window.location.href}!`
        modules.forEach((el) => {
            log += `\n${el.name}: ${s[el.settingsTarget] ? '✔ aktiv' : '✘ inaktiv'}`
        })
        log += `\nDas Team der Codebase wünscht viel Spaß!
Bei Fehlern kopiere bitte diesen Text und füge ihn in deine Fehlermeldung ein. Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen.`;
        console.log(log);
    }
    //Ende auführen
})();
