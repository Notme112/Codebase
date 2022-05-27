GM_info = {
    script: {
        name: 'ReSi-Codebase',
        version: '1.6.1'
    }
};
/* => ab hier <= */
(async () => {
    if ($('.landing-header').length) return
    //define getAPI function
    getAPI = async function (name) {
        if (!sessionStorage.getItem(`a${name}`) || JSON.parse(sessionStorage.getItem(`a${name}`)).lastUpdate > (new Date).getTime() * 1000 * 60 * 5) {
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
    //define validate function
    function validate(text) {
        return text.replaceAll('<', '').replaceAll('>', '');
    }
    //define notification function
    async function checkNotificationPermission() {
        return new Promise(async (res) => {
            if (Notification.permission === "granted") {
                res(true);
            } else if (Notification.permission !== 'denied') {
                await Notification.requestPermission((perm) => {
                    if (perm === "granted") {
                        res(true);
                    } else {
                        res(false);
                    }
                });
            }
        })
    }
    //add own css to head
    const css = `<style>
.codebase:focus{
outline: none;
}
</style>`;
    $(document.head).append(css);
    //save darkmode-settings in localstorage
    try {
        if (location.pathname == '/') {
            if ($('#darkMode').html().includes('Tag'))
                localStorage.setItem('darkmode_resi_base', 'true');
            else localStorage.setItem('darkmode_resi_base', 'false');
        }
    } catch {
        console.error('Darkmode-Button nicht gefunden');
    };
    $('#darkMode').on('click', () => {
        if (localStorage.getItem('darkmode_resi_base') == 'true')
            localStorage.setItem('darkmode_resi_base', 'false');
        else localStorage.setItem('darkmode_resi_base', 'true');
    });
    //initialize modules
    const modules = [{
            name: "Gesamtmünzenzähler",
            description: "Zeigt in der Seitenleiste die gesamt verdienten Münzen an.",
            settingsTarget: "gesamtmuenzen",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "gesamtmuenzenCheck",
            func: async (s) => {
                const r = await getAPI('user');
                $('#darkMode').after(
                    `<li>${r.muenzenTotal ? r.muenzenTotal.toLocaleString() : 'XXX'} Münzen</li>`
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
            version: "1.0.0",
            author: "NiZi112",
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
            version: "1.0.0",
            author: "NiZi112",
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
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "flogout",
            target: "flogoutCheck",
            keywords: ['FastLogout', 'Logout', 'Fast', 'Logout', 'scneller', 'Logout'],
            allSite: false,
            func: async (s) => {
                $('.brand-img:first')
                    .css('display', 'inline')
                    .css('padding-right', '20px')
                    .html('<i class="fas fa-sign-out-alt"></i>')
                    .on('click', () => {
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
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "streammode",
            target: "streammodeCheck",
            keywords: ['Streamer', 'Youtube', 'Streammode-Text', 'Streammode', 'Streamer-Modus', 'Twitch', 'YT'],
            allSite: false,
            func: async (s) => {
                $("#chat")
                    .html(s.text.stream_mode ? s.text.stream_mode : '')
                    .css('padding', '15px');
            },
            hasSettings: true,
            settings: [{
                subtarget: "text",
                target: "streamerText",
                name: "Text",
                type: "input-text",
                settingsKey: "stream_mode",
                preset: "TEXT",
                default: 'Lade dir JETZT die ReSi-Codebase herunter: <a href="https://github.com/Notme112/Codebase/raw/main/install.user.js" target="_blank">github.com/Notme112/Codebase/raw/main/install.user.js</a>'
            }],
        },
        {
            name: "Eigene Sounds",
            description: "Erlaubt euch, eigene Sounds in das Spiel zu bringen",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
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
                preset: "URL",
                default: '/sounds/newCall.mp3'
            }, {
                subtarget: "audio",
                target: "fmsAudio",
                name: "FMS-Sound",
                type: "input-text",
                settingsKey: "fms",
                preset: "URL",
                default: '/sounds/radioFMS.mp3'
            }, {
                subtarget: "audio",
                target: "fms5Audio",
                name: "FMS5-Sound",
                type: "input-text",
                settingsKey: "fms5",
                preset: "URL",
                default: '/sounds/fms5.mp3'
            }, {
                subtarget: "audio",
                target: "errorAudio",
                name: "Error-Sound",
                type: "input-text",
                settingsKey: "error",
                preset: "URL",
                default: '/sounds/error.mp3'
            }, {
                subtarget: "audio",
                target: "finischAudio",
                name: "Einsatz-abgeschlossen-Sound",
                type: "input-text",
                settingsKey: "finish",
                preset: "URL",
                default: '/sounds/finishedMission.mp3'
            }],
        },
        {
            name: "Autocomplete verhindern",
            description: "Verhindert den Autocomplete des Browsers bei den Feldern der Einsatzannahme und des Chats.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "autocomplete",
            target: "autocompleteCheck",
            keywords: ['Browser', 'complete', 'verhindern', 'autocomplete'],
            allSite: true,
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
            name: "[outdated] Einsatzzähler",
            description: "Zeigt in Seitenleiste die Zahl der heute absolvierten Einsätze. Funktion in Statistics LST enthalten!",
            helpLink: "",
            version: "outdatet",
            author: "NiZi112",
            settingsTarget: "einsatzzaehler",
            target: "einsatzzeahlerCheck",
            keywords: ["Einsatz", "Zahl", "Zähler", "zählen", "Einsatze", "zählen"],
            allSite: false,
            func: async (s) => {
                let today = (new Date()).getDate();
                if (!localStorage.getItem("finished_missions_nizi") || !localStorage.getItem("finished_missions_nizi_time")) {
                    localStorage.setItem("finished_missions_nizi", "0")
                    localStorage.setItem("finished_missions_nizi_time", today)
                };
                if (localStorage.getItem("finished_missions_nizi_time") != today) {
                    localStorage.setItem("finished_missions_nizi", "0")
                    localStorage.setItem("finished_missions_nizi_time", today)
                };
                $("#darkMode").after(`<li id="finishedMissionsToday">Einsätze heute: ${localStorage.getItem("finished_missions_nizi")}</li>`)
                socket.on("finishMission", () => {
                    var missions = parseInt(localStorage.getItem("finished_missions_nizi"));
                    missions++;
                    localStorage.setItem("finished_missions_nizi", missions);
                    $('#finishedMissionsToday').html(`Einsätze heute: ${localStorage.getItem("finished_missions_nizi")}`)
                });
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Push FMS5",
            description: "Sendet eine Brwoserbenachrichtigung bei einem Sprechwunsch.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "pushFMS",
            target: "pushFMSChack",
            keywords: ['Browserbenachrichtigung', 'Browser', 'Push', 'Ping', 'PushFMS', 'FMS', 'Status', '5', 'Sprechwunsch'],
            allSite: false,
            func: async (s) => {
                if (!await checkNotificationPermission()) return;
                socket.on("vehicleFMS", (vehicleFMSObject) => {
                    var fms = `${vehicleFMSObject.userVehicleFMS}`;
                    if (`${vehicleFMSObject.userVehicleFMS}`.includes("5")) {
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
            version: "1.0.0",
            author: "NiZi112",
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
                    preset: "ZAHL",
                    default: 7
                },
                {
                    subtarget: "darkmodeSettings",
                    target: "uhrMax",
                    name: "Darkmode um ... Uhr einschalten",
                    type: "input-number",
                    settingsKey: "max",
                    preset: "ZAHL",
                    default: 19
                }
            ],
        },
        {
            name: "Uhr",
            description: "Zeigt in der Navbar eine kleine Uhr.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "uhr",
            target: "uhrCheck",
            keywords: ["Uhr", "Zeit", "Uhrzeit", "Navbar"],
            allSite: false,
            func: async (s) => {
                var hallo = document.createElement("div");
                $(".brand:first").after(`<div id="clock"></div>`);
                var updateClock = function () {
                    var date = new Date();
                    var stunde = date.getHours();
                    var minute = date.getMinutes();
                    if (minute < 10) {
                        minute = `0${minute}`
                    };
                    $('#clock').html(`${stunde}:${minute} <i class='far fa-clock'></i>`);
                };
                setInterval(updateClock, 50)
            },
            hasSettings: false,
            settings: [],
        },
        {
            name: "Settings in der Navbar",
            description: "Die Codebase-Einstellungen lassen sich so auch direkt über die Navbar aufrufen.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "settings",
            target: "settingsCheck",
            keywords: ["schnell", "Zugriff", "Einstellungen", "Navbar"],
            allSite: false,
            func: async (s) => {
                $(".brand").after(`<span class="openCodebaseSettings"><i class="fas fa-cogs codebase" focusable="false" data-tooltip="ReSi-Codebase-Einstellungen"></i></span>`);
                $('.openCodebaseSettings').on('click', () => {
                    $('#Codebase').click()
                });
            },
            hasSettings: false,
            settings: [],
        }, {
            name: "Chat-Count",
            description: "Zählt die Zeichen im Chat.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
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
                    }
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
        }, {
            name: "AlertChat",
            description: "Sendet kleine Popups bei einer Chatnachricht.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "alertChat",
            target: "alertChatCount",
            keywords: ["Popup", "Sytemnachricht", "Nachricht", "Benachrichtgung"],
            allSite: false,
            func: async (s) => {
                socket.on("associationMessage", (msg) => {
                    if (msg.message && msg.userName != ReSi.userName) {
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
        }, {
            name: "FilterKH",
            description: "Filtert die Krankenhäuser in einem Sprechwunsch.",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            settingsTarget: "filterKH",
            target: "filterKHCheck",
            keywords: ["Filter", "Krankenhäuser", "Sprechwunsch", "FMS5", "S5"],
            allSite: true,
            func: async (s) => {
                if ($('.s5').length > 0 && location.pathname.includes('vehicle')) {
                    var val = s.filterKHSettings.maxDistanceKH;
                    var own = s.filterKHSettings.ownKH;
                    var alli = s.filterKHSettings.alliKH;

                    var active = s.filterKHActive;

                    $('.card:first').after(`<button class='button button-round button-danger' id='changeFilterKHMode'>Filter aktivieren</button>`)

                    if (s.filterKHSettings ? s.filterKHSettings.showPatientsInfo : false) $('.card:first').hide();

                    function addFilter() {
                        for (var i = 1; i < $('.box-progress').length + 1; i++) {
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
                            $('#changeFilterKHMode').removeClass('button-danger')
                                .addClass('button-success')
                                .text('Filter aktiviert');
                            s.filterKHActive = true;
                        } else {
                            removeFilter();
                            $('#changeFilterKHMode')
                                .removeClass('button-sucsess')
                                .addClass('button-danger')
                                .text('Filter deaktiviert');
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
                    preset: "CHECKBOX",
                    default: true
                }, {
                    subtarget: "filterKHSettings",
                    target: "alliKH",
                    name: "Verbandskrankenhäuser anzeigen",
                    type: "checkbox",
                    settingsKey: "alliKH",
                    preset: "CHECKBOX",
                    default: true
                }, {
                    subtarget: "filterKHSettings",
                    target: "maxDistanceKH",
                    name: "Maximale Entfernung der Krankenhäuser",
                    type: "input-number",
                    settingsKey: "maxDistanceKH",
                    preset: "ZAHL",
                    default: 20
                },
                {
                    subtarget: "filterKHSettings",
                    target: "showPatientsInfoCheck",
                    name: "Patienteninformationen verstecken",
                    type: "checkbox",
                    settingsKey: "showPatientsInfo",
                    preset: "CHECKBOX",
                    default: false
                }
            ],
        }, {
            name: "Alarmansichtswechsler",
            description: "Wechselt im Einsatz mit der Taste \"U\" zwischen der Wachen- und Fahrzeugansicht.",
            settingsTarget: "switchAlarmingMode",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "switchAlarmingModeCheck",
            func: async (s) => {
                if (!location.pathname.includes('/mission/')) return
                $(document).on('keyup', (e) => {
                    if (e.keyCode == 85) $('.detail-right .button-gray').click()
                })
            },
            keywords: ['Switch', 'Einsatz', 'Mission', 'Wachenansicht', 'wechseln', 'Fahrzeugansicht'],
            hasSettings: false,
            allSite: true,
            settings: [],
        }, {
            name: "Einsatzstatistiken",
            description: "Zeigt in der Einsatzliste, wie viele Einsätze in welchem Status (rot, gelb, grün) ihr aktuell offen habt und wie viel Prozent von euren gesamten Einsötzen dieser Anteil ausmacht.",
            settingsTarget: "missionStatistics",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "statisticsCheck",
            func: async (s) => {
                var red = 0;
                var yellow = 0;
                var green = 0;
                var rPer = 0;
                var yPer = 0;
                var gPer = 0;
                var data;

                function calcPercent() {
                    red = $('.mission-list-progress-1').length;
                    yellow = $('.mission-list-progress-2').length;
                    green = $('.mission-list-progress-3').length;
                    var all = red + yellow + green;
                    rPer = Math.floor(red / all * 100);
                    yPer = Math.floor(yellow / all * 100);
                    gPer = Math.floor(green / all * 100);
                    if (isNaN(rPer)) rPer = 0;
                    if (isNaN(yPer)) yPer = 0;
                    if (isNaN(gPer)) gPer = 0;
                    data = `Rot: ${red} (${rPer}%), Gelb: ${yellow} (${yPer}%), Grün: ${green} (${gPer}%)`
                    $('#missionPercent').attr('data-tooltip', data)
                };
                calcPercent();
                $('#missions .panel-expand').before(`<span class="fa fa-info-circle nizi112" id="missionPercent" data-tooltip="${data}"></span>`);
                socket.on('missionStatus', () => {
                    calcPercent();
                });
                socket.on('finishMission', () => {
                    calcPercent();
                });
            },
            keywords: ['Statistiken', 'Einsatz', 'Mission', 'Status', 'Einsätze', 'Info'],
            hasSettings: false,
            allSite: false,
            settings: [],
        }, {
            name: "ShowNAChance",
            description: "Zeigt im Einsatz mit Patienten die Chance der Grundvarinate, dass ein Notazt gebraucht wird.",
            settingsTarget: "ShowNAChance",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "ShowNAChanceCheck",
            func: async (s) => {
                if (!location.pathname.includes('/mission/')) return
                const api = (await getAPI('missions'))[parseInt($('.detail-title').attr('missionid'))]
                if (data.patients) $('#s5').after(`<span class='label label-info'>Grundvariante: ${data.patients.min}-${data.patients.max} Patienten, ${data.patients.naChance}\% NA-Wahrscheinlichkeit`)
            },
            keywords: ['Notarzt', 'Einsatz', 'Mission', 'Wahrscheinlichkeit', 'Einsätze', 'Info'],
            hasSettings: false,
            allSite: false,
            settings: [],
        }, {
            name: "Münzendifferenz",
            description: "Auf dem Nutzerprofil eines anderen Nutzer sehr ihr, wie viele Münzen mehr / wneiger dieser Nutzer hat.",
            settingsTarget: "differentToAnotherUser",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "differentToAnotherUserCheck",
            func: async (s) => {
                if (!location.pathname.includes('/profile/')) return
                const res = await getAPI('user')
                var diff = parseInt($('.detail-subtitle b').eq(2).text().replaceAll('.', '')) - res.muenzenTotal,
                    negative;
                diff < 0 ? negative = true : negative = false;
                diff = Math.abs(diff)
                $('.detail-subtitle').eq(1).after(`<i class="fas fa-arrows-alt-v"></i> Differenz: <b>${diff.toLocaleString()}</b> Münzen ${negative ? 'weniger als Du' : 'mehr als Du'}`)
            },
            keywords: ['Profil', 'Nutzerprofil', 'Münzendifferenz', 'Gesamtmünzen', 'Münzen', 'Info'],
            hasSettings: false,
            allSite: true,
            settings: [],
        }, {
            name: "DistanceVehicle",
            description: "Filtert die Fahrzeuge im Einsatz, die weiter als x Kilometer entfernt sind.",
            settingsTarget: "vehicleDistance",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "distaceVehicleCheck",
            func: async (s) => {
                if (!location.pathname.includes('/mission/')) return;
                var distance = 10;
                s.distaceVehicle ? distance = s.distaceVehicle.distance : '';

                function applyFilter(dis) {
                    const el = document.querySelectorAll('.mission-vehicle')
                    const km = document.querySelectorAll('.vehicle-distance')
                    for (var i = 0; i < el.length; i++) {
                        var e = el[i];
                        if (parseFloat(km[i].innerText.replace('~', '')) > dis) {
                            e.classList.remove('vehicle');
                            e.style.display = 'none';
                        } else {
                            if (!e.classList.contains('vehicle')) {
                                e.classList.add('vehicle');
                                e.style.display = '';
                            };
                        };
                    }
                    updateAAOButtons()
                };
                if (s.filterKMActualActive) applyFilter(parseInt(distance) ? parseInt(distance) : 10)
                else applyFilter(1000000)
                $('.enroute:first').before(`<button class="button button-round button-${s.filterKMActualActive ? 'success' : 'danger'}" id="toggleVehicleFilter">Fahrzeuge ${s.filterKMActualActive ? 'nicht ' : ''}filtern</button>`)
                $('#toggleVehicleFilter').on('click', () => {
                    s.filterKMActualActive = !s.filterKMActualActive;
                    localStorage.storage_resi_base = JSON.stringify(s)
                    if (s.filterKMActualActive) {
                        applyFilter(parseInt(distance) ? parseInt(distance) : 10)
                        $('#toggleVehicleFilter')
                            .html('Fahrzeuge nicht filtern')
                            .removeClass('button-danger')
                            .addClass('button-success')
                    } else {
                        applyFilter(1000000)
                        $('#toggleVehicleFilter')
                            .html('Fahrzeuge filtern')
                            .removeClass('button-success')
                            .addClass('button-danger')
                    }
                })
            },
            keywords: ['Einsatz', 'Mission', 'Fahrzueg', 'Einsätze', 'Fahrzeuge', 'AAO'],
            hasSettings: true,
            allSite: true,
            settings: [{
                subtarget: "distaceVehicle",
                target: "distaceVehicleDistaceInput",
                name: "Entfernung",
                type: "input-number",
                settingsKey: "distance",
                preset: "ZAHL",
                default: 20
            }],
        }, {
            name: "TitleChange",
            description: "Stellt einen individuellen Webseitentitel ein, welcher oben im Browsertab angezeigt wird.",
            settingsTarget: "titleChange",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "titleChangeCheck",
            func: async (s) => {
                document.title = s.titleChangeSettings ? s.titleChangeSettings.title ? s.titleChangeSettings.title : 'rettungssimulator.online' : 'rettungssimulator.online'
            },
            keywords: ['Title', 'Titel', 'Browser', 'ReSi', 'Webseite', 'Info'],
            hasSettings: true,
            allSite: true,
            settings: [{
                subtarget: "titleChangeSettings",
                target: "titleChangeInput",
                name: "Titel",
                type: "input-text",
                settingsKey: "title",
                preset: "TEXT",
                default: 'rettungssimulator.online'
            }],
        }, {
            name: "AlertFMS5",
            description: "Sobald ein Fahrzeug einen Sprechwunsch hat, wird euch das per Mitteilungsbox angezeigt.",
            settingsTarget: "alertFMS5",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "alertFMS5Check",
            func: async (s) => {
                try {
                    socket.on("vehicleFMS", (vehicleFMSObject) => {
                        if (vehicleFMSObject.userVehicleFMS != 5) return
                        modal(`Sprechwunsch`, `${vehicleFMSObject.userVehicleName} hat einen Sprechwunsch`, 'öffnen', 'schließen', () => {
                            if (vehicleFMSObject.vehicleID == 43) {
                                openFrame(`/vehicle/${vehicleFMSObject.userVehicleID}`, '1/2/4/4')
                            } else {
                                openFrame(`/mission/${vehicleFMSObject.userMissionID}`, '1/1/4/5')
                            }
                        })
                    })
                } catch (e) {
                    console.error('socket not found')
                }
            },
            keywords: ['FMS', 'FMS5', 'Sprechwunsch', 'Benachrichtigung', 'Popup', 'Alert', 'Info'],
            hasSettings: false,
            allSite: true,
            settings: []
        }, {
            name: "StatisticsLST",
            description: "Dieses Modul zeit euch in eurer Leitstelle Fahrzeug- sowie Gebäudestatistiken. Weiter gibt es Statistiken zu den heute verdienten Münzen, absolvierten Einsätzen und transportierten Patienten.",
            settingsTarget: "statisticsLST",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "statisticsLSTCheck",
            func: async (s) => {
                if (!localStorage.counterConfig) localStorage.counterConfig = JSON.stringify({
                    dayReset: (new Date()).getDate(),
                    yearReset: (new Date()).getFullYear(),
                    missionsToday: 0,
                    missionsYear: 0,
                    moneyToday: 0,
                    moneyYear: 0,
                    patientsToday: 0,
                    patientsYear: 0
                });
                if ($('#tab_controlCenter_stats').length && location.pathname.includes('/department/')) {
                    var config = JSON.parse(localStorage.counterConfig)
                    //vehicles
                    const userVehicles = await getAPI('userVehicles');
                    const vehicleCategories = await getAPI('vehicleCategories');
                    for (var i in userVehicles) {
                        for (var j in vehicleCategories) {
                            if (!vehicleCategories[j].count) vehicleCategories[j].count = 0
                            if (vehicleCategories[j].ids.includes(userVehicles[i].vehicleID)) {
                                ++vehicleCategories[j].count;
                            }
                        }
                    }
                    //buildings
                    const userBuildings = await getAPI('userBuildings');
                    const buildingCategories = await getAPI('buildings');
                    userBuildings.forEach((el) => {
                        if (!buildingCategories[(el.buildingType - 1)].count) buildingCategories[(el.buildingType - 1)].count = 0
                        buildingCategories[(el.buildingType - 1)].count++
                    })
                    //insert into #tab_controlCenter_stats
                    var table = `<table class="table-divider striped"><thead><tr><th><u>Wachentyp</u></th><th><u>Anzahl</u></th></tr></thead></tbody>`;
                    buildingCategories.forEach((el) => {
                        table += `<tr><td>${el.buildingName}</td><td>${el.count ? el.count : 0}</td></tr>`;
                    });
                    table += `</tbody><thead><tr><th><u>Fahrzeugtyp</u></th><th><u>Anzahl</u></th></tr></thead></tbody>`;
                    for (i in vehicleCategories) {
                        if (!vehicleCategories[i].ids.length || vehicleCategories[i].ids[0] > 10000) continue
                        table += `
						<tr><td>${vehicleCategories[i].name}</td><td>${vehicleCategories[i].count ? vehicleCategories[i].count : 0}</td></tr>`
                    }
                    table += `</tbody><thead><tr><th><u>Typ</u></th><th><u>Anzahl</u></th></tr></thead><tbody><tr><td>Einsätze heute</td><td>${config.missionsToday.toLocaleString()}</td></tr><tr><td>Einsätze dieses Jahr</td><td>${config.missionsYear.toLocaleString()}</td></tr><tr><td>Patienten heute</td><td>${config.patientsToday.toLocaleString()}</td></tr><tr><td>Patienten dieses Jahr</td><td>${config.patientsYear.toLocaleString()}</td></tr><tr><td>Münzen heute</td><td>${config.moneyToday.toLocaleString()}</td></tr><tr><td>Münzen dieses Jahr</td><td>${config.moneyYear.toLocaleString()}</td></tr></tbody></table>`;
                    $('#tab_controlCenter_stats').append(table)
                    $('#tab_controlCenter_stats').find('.label').css('text-decoration', 'line-through')
                }
                if (location.pathname == '/') {
                    const config = JSON.parse(localStorage.counterConfig);

                    function changeConfig(type, plus = 1) {
                        if (config.yearReset != (new Date()).getFullYear()) {
                            for (i in config) {
                                if (i.includes('Year')) continue
                                config[i] = 0;
                            }
                            config.yearReset = (new Date()).getFullYear();
                            config.dayReset = (new Date()).getDate();
                        }
                        if (config.dayReset != (new Date()).getDate()) {
                            for (var i in config) {
                                if (i.includes('Year')) continue
                                config[i] = 0
                            }
                            config.dayReset = (new Date()).getDate();
                        }
                        if (type) {
                            switch (type) {
                                case 'patients':
                                    config.patientsToday++;
                                    config.patientsYear++;
                                    break;
                                case 'money':
                                    config.moneyToday += plus;
                                    config.moneyYear += plus;
                                    break;
                                case 'missions':
                                    config.missionsToday++;
                                    config.missionsYear++
                                    break;
                                default:
                                    console.error(`Unknown config type "${type}" => changeConfig@Statistics LST (V${GM_info.script.version})`);
                            }
                        }
                        localStorage.counterConfig = JSON.stringify(config)
                    }
                    socket.on('patientStatus', (e) => {
                        if (e.userPatientStatus != 4)
                            changeConfig('patients')
                    })
                    var actual = parseInt($('.muenzen:first').text().replaceAll('.', ''));
                    socket.on('muenzenUpdate', (e) => {
                        e = parseInt(e.toString().replaceAll('.', ''))
                        actual = parseInt(actual.toString().replaceAll('.', ''))
                        if (e > actual) {
                            var diff = e - actual;
                            changeConfig('money', diff)
                        }
                        actual = e;
                    })
                    socket.on('finishMission', (e) => {
                        changeConfig('missions')
                    })
                }
            },
            keywords: ['LST', 'Leitstelle', 'Statistiken', 'Übersicht', 'Fahrzeuge', 'Gebäude', 'Info'],
            hasSettings: false,
            allSite: true,
            settings: []
        },
        {
            name: "CollapseCards in Association",
            description: "Die Karten auf der Verbandsseite bei den Mitgliedern lassen sich zusammenklappen.",
            settingsTarget: "collapseCardsAssociation",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "collapseCardsAssociationCheck",
            func: async (s) => {
                if (!location.href.includes('/association/')) return;
                let autoCollapse = s.collapseCardsAssociation.autoCollapseCards;
                $('.card-headline:contains("Verbandsleitung")').html($('.card-headline:contains("Verbandsleitung")').html() + '<i class="fas fa-angle-up pointer right card-collapse-toggle"></i>').parent().addClass(`card-collapse${autoCollapse ? ' collapsed' : ''}`);
            },
            keywords: ['Verband', 'Association', 'Cards', 'Collapse', 'automatisch', 'übersichtlich'],
            hasSettings: true,
            allSite: true,
            settings: [{
                subtarget: "collapseCardsAssociation",
                target: "autoCollapseCards",
                name: "Automatisches zusammenklappen",
                type: "checkbox",
                settingsKey: "autoCollapseCards",
                preset: "CHECKBOX",
                default: false
            }]
        },
        {
            name: "HideDevelopedStepsAtRoadmap",
            description: "Blendet bereits entwickelte Schritte auf der Roadmap aus.",
            settingsTarget: "hideDevelopedStepsAtRoadmap",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "hideDevelopedStepsAtRoadmapCheck",
            func: async (s) => {
                if (!location.href.includes('/roadmap')) return;
                $('.label-success').parent().parent().parent().hide().next().hide();
            },
            keywords: ['Roadmap', 'neu', 'fertig', 'ausblenden', 'Filter', 'verstecken'],
            hasSettings: false,
            allSite: true,
            settings: []
        },
        /* */
        {
            name: "HideDeletedMessagesInChat",
            description: "Blendet gelöschte Chatnachrichten aus.",
            settingsTarget: "hideDeletedMessagesInChat",
            helpLink: "",
            version: "1.0.0",
            author: "NiZi112",
            target: "hideDeletedMessagesInChatCheck",
            func: async (s) => {
                function deleteMessages() {
                    $(".message-deleted").remove();
                };
                socket.on("associationMessageDelete", associationMessageDeleteObject => {
                    deleteMessages();
                });
                deleteMessages();
            },
            keywords: ['Chat', 'Nachrichten', 'gelöscht', 'ausblenden', 'Filter', 'verstecken'],
            hasSettings: false,
            allSite: false,
            settings: []
        },
        {
            name: "searchInMissionOverview",
            description: "Fügt eine Suche zur Einsatzübersicht hinzu.",
            settingsTarget: "searchInMissionOverview",
            version: "1.0.0",
            author: "NiZi112",
            target: "searchInMissionOverviewCheck",
            func: async (s) => {
                if (!location.pathname.includes("/missionOverview")) return;
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
            },
            keywords: ["Suche", "Serach", "Mission", "Overview", "Übersicht", "Einsatz", "Mission", "Einsatzübersicht"],
            hasSettings: false,
            allSite: true,
            settings: []
        }
    ];
    //function build default storage object from modules
    function buildDefaultStorage() {
        let obj = {};
        modules.forEach((el) => {
            obj[el.settingsTarget] = false;
            if (el.hasSettings) {
                el.settings.forEach((setting) => {
                    if (setting.subtarget && !obj[setting.subtarget]) obj[setting.subtarget] = {};
                    if (setting.subtarget) obj[setting.subtarget][setting.settingsKey] = setting.default
                    else obj[setting.settingsKey] = setting.default
                });
            }
        });
        return obj;
    }
    //new user
    if (!localStorage.storage_resi_base) {
        //set storage
        localStorage.setItem(
            'storage_resi_base',
            JSON.stringify(buildDefaultStorage())
        );
        localStorage.setItem('resiBaseRemovedStorage', '1.5.1');
        //show welcome message
        systemMessage({
            title: 'Willkommen bei der ReSi-Codebase!',
            message: `Schön, dass Du dich entschlossen hast, die ReSi-Codebase zu nutzen!<br><br>
Du kannst jeden Modul einzeln aktivieren, die Möglichkeit findest Du in einem Einstellungs-Panel, welches Du über die Seitenleiste aufrufen kannst.<br>
Probier doch einfach mal alle Module aus. Wenn Du nicht weißt, was ein Modul tut, dann klick einfach auf das [?] hinter dem Namen, damit kommst Du zur Wikiseite des Moduls.<br><br>
Fehler bitte im Forum melden - oder im Thread ReSi-Codebase auf Discord im Bereich <code>#skripting</code><br><br>
Gerne kannst du auch unserem Discord-Server beitreten: <a href="https://discord.gg/8FyA6HBbXs" target="_blank" class="no-prevent">discord.gg/8FyA6HBbXs</a><br><br>
Viel Spaß,<br>
Dein Team der ReSi-Codebase`,
            type: 'info'
        });
    }
    //remove storage if necessary
    if (localStorage.resiBaseRemovedStorage != '1.5.1') {
        localStorage.storage_resi_base = JSON.stringify(buildDefaultStorage());
        localStorage.resiBaseRemovedStorage = '1.5.1'
    }
    //load storage
    const s = JSON.parse(localStorage.storage_resi_base);
    //codebase class
    class ReSiCodebase {
        constructor() {
            this.version = GM_info.script.version
            this.settings = s;
        }
    }
    //function check settings and catching errors when there is a new branch
    function checkSettings() {
        if (!localStorage.storage_resi_base) reload();
        modules.forEach((el) => {
            if (el.hasSettings) {
                el.settings.forEach((setting) => {
                    if (setting.subtarget && !s[setting.subtarget]) {
                        s[setting.subtarget] = {};
                    }
                })
            }
        });
    }
    checkSettings();
    //create object from codebase class
    codebase = new ReSiCodebase();
    //own frame
    //create
    $('#darkMode').after(`<li id='Codebase'>ReSi-Codebase</li>`);
    $('#Codebase').on('click', async () => {
        openFrame('', '1/1/4/5');
        const frame = $('#iframe');
        frame.on('load', async () => {
            //build frame content
            var frameContent = `<div class='panel-body'>
<script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js?v=${ReSi.resiVersion}'></script>
<link rel='stylesheet' href='https://rettungssimulator.online/css/index.css?v=${ReSi.resiVersion}' charset='utf-8'>
<script src='https://rettungssimulator.online/js/index.js?v=${ReSi.resiVersion}'></script>
<script src='https://rettungssimulator.online/js/iframe.js?v=${ReSi.resiVersion}'></script>
<script src='https://rettungssimulator.online/js/controlCenter.js?v=${ReSi.resiVersion}'></script>
<script src="https://rettungssimulator.online/js/popper.js?v=${ReSi.resiVersion}" charset="utf-8"></script>
<script src='https://rettungssimulator.online/js/tippy.js?v=${ReSi.resiVersion}'></script>
<style>
.searchHidden{
display: none;
};
</style>
<script>
if(localStorage.darkmode_resi_base=='true') {
$('body').addClass('dark');
}
let changes = false;
$('.checkbox-container, .input-round').on('click keydown', () => {
if(!$(this).hasClass('nochange')){
changes = true;
}
})
let valide = value => value.replaceAll('>', '').replaceAll('<', '');
$('body').on('keyup', (e) => {
if(e.keyCode === 27) $(".right:first").click();
});
$('.open-profile').on('click', (e) => {
let author = $(e.currentTarget).attr('profile');
e.preventDefault()
if(changes) modal('Profil des Autors aufrufen?', 'Willst du das Profil von '+author+' aufrufen? Du hast ungespeicherte Optionen in den Einstellungen. Diese gehen verloren, wenn du das profil des Autors aufrufst.', 'Aufrufen', 'Hier bleiben', () => {
location.href = '/profile/'+author;
}, () => {});
else location.href = '/profile/'+author;
});
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
$('#input_search').on('input change keyup', search);
</script>
<div class='detail-header'>
<div class='detail-title'>ReSi-Codebase <div class='right pointer' onclick='if(changes === true){modal("Ohne Speichern verlassen?","Du hast Änderungen vorgenommen, willst du diese Seichern?","Speichern","Ohne speichern verlassen",() => {$("#saveCodebaseSettings").click()}, () => {parent.closeFrame()})}else{parent.closeFrame()}'> &times; </div><div class='right pointer share' data-tooltip='Die ReSi-Codebase weiterempfelen' share-url='https://forum.rettungssimulator.online/index.php?thread/1423-resi-codebase-v1-5/&action=firstNew'>&hookrightarrow;</div></div>
<div class='detail-subtitle'>Verwalte hier deine Einstellungen für die ReSi-Codebase
<button class="button button-round button-success" id="showStorage">Gespeicherte Daten der Scripte anzeigen</button>
<button id="exportSettings" class="button button-round button-success">Einstellungen exportieren</button>
<button id="importSettings" class="button button-round button-success">Einstellungen importieren</button>
<button id="resetStorage" class="button button-round button-success">Einstellungen zurücksetzen</button>
<div class="input-container nochange" style="float:right"><label for='input_search'>Suche</label>
<input class="input-round input-inline nochange" type="text" value="" style="padding-left:20px;padding-right:20px;" id="input_search" placeholder="Suche..." autocomplete="off">
</div>
</div>
</div>
<div class='tabs tabs-horizotal'>
<div class='tab tab-active' for='settings-moduls'>Module</div>
<div class='tab' for='licence'>Sonstiges & Lizenzen</div>
</div>
<div class='tab-container'>
<div class='tab-content tab-content-active' id='tab_settings-moduls'>
<h2>Module:</h2>
<h4 class='label label-info searchNoResult hidden'>Die Suche lieferte keine Ergebnisse! Bitte probiere es mit einem anderen Suchwort!</h4>`;
            //checkboxes for modules
            modules.forEach((el) => {
                frameContent += `<div class='checkbox-container searchable'><input id='${el.target}' type='checkbox' ${s[el.settingsTarget] ? 'checked' : ''}><label for='${el.target}'>${el.name} aktivieren<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a> ${el.hasSettings ? '<span data-tooltip="Dieses Modul hat Einstellungen! Passe es dir nach deinem Geschmack an!">[!]</span>' : ''} <span class="label label-success">von: ${'<span class="open-profile pointer" profile="'+ el.author + '" frame="1/2/4/4">' + el.author + '</span>'}</span> <span class="label label-success">V${el.version}</span></label><div class='hidden keyword-serach'>${el.keywords.join(' ')}</div></div>`;
                if (el.hasSettings) {
                    frameContent += `<div class="searchable card card-collapse${s[el.settingsTarget] ? '' : ' collapsed'}" style="padding-left:100px;">
<div class="card-headline card-headline-danger">
Einstellungen zu ${el.name}
<div class="card-tools">
<span class="card-collapse-toggle pointer" style="font-size:15px;overflow:hidden;vertical-algin:middle">${s[el.settingsTarget] ? '&darr;' : '&uarr;'}</span>
</div>
</div>
<div class="card-body">`;
                    el.settings.forEach((setting) => {
                        var value = setting.subtarget ? s[setting.subtarget][setting.settingsKey] : s[setting.settingsKey];
                        switch (setting.type) {
                            case 'checkbox':
                                frameContent += `<div class='checkbox-container'><input id='${setting.target}' ${value ? 'checked' : ''} type='checkbox'><label for='${setting.target}'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></label></div>`
                                break;
                            case 'input-text':
                                frameContent += `<div class='input-container'><div class='input-label'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></div><div class='input-icon'></div><input class='input-round' value='${value ? value : ''}' autocomplete='off' id='${setting.target}' placeholder='${setting.preset}'></div>`
                                break;
                            case 'input-number':
                                frameContent += `<div class='input-container'><div class='input-label'>${setting.name} (${setting.preset})<a class='no-prevent' href='${el.helpLink}' target='_blank' data-tooltip='${el.description} Mehr im Hilfeartikel!'> [?]</a></div><div class='input-icon'></div><input class='input-round' type='number' value='${value ? value : ''}' autocomplete='off' id='${setting.target}' placeholder='${setting.preset}'></div>`
                                break;
                            case 'input-choose':
                                //
                            default:
                                frameContent += `<div class='alert alert-info'>Unbekannte Einstellungsmöglichkeit ${setting.type} @ ${el.name}</div>`
                                break;
                        }
                    })
                    frameContent += `</div></div>`
                }
            });
            frameContent += `<button class='button-success button button-round' id='saveCodebaseSettings'>Speichern</button>
</div>
<div class='tab-content' id='tab_licence'>
<h2>Fehler melden:</h2>
<p>
<a href="https://discord.gg/8FyA6HBbXs" target="_blank" class="no-prevent button button-round button-success">Discord-Server</a> - <a href='https://github.com/Notme112/Codebase/issues/new/choose' class='no-prevent button button-success button-round' target='_blank'>Github</a> - <a href='https://forum.rettungssimulator.online/index.php?thread/1423-resi-codebase-v1-0/&action=lastPost' class='no-prevent button button-success button-round' target='_blank'>Forum</a> - ReSi-Discord: im Thread ReSi-Codebase im Bereich <code>#skripting</code>
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
<center>Joine unserem Discord-Server: <a href="https://discord.gg/8FyA6HBbXs" target="_blank" class="no-prevent">discord.gg/8FyA6HBbXs</a><br><br></center>
<h3>Danke für die Nutzung der ReSi-Codebase!</h3>
</div>`
            frame.contents().find('body').html('')
            frame.contents().find('body').append(frameContent);
            closeFrameOrig = closeFrame;

            function closeFrame() {
                frame.contents().find('html').html('');
                closeFrameOrig()
                closeFrame = closeFrameOrig;
            }
            //show localStorge & sessionStorage
            frame.contents().find('#showStorage').on('click', () => {
                var table = '<table class="table-divider striped"><thead><tr><th>Key</th><th>Wert</th></tr><tbody>'
                for (var i = 0; i < localStorage.length; i++) {
                    key = localStorage.key(i);
                    table += `<tr><td>${key}</td><td>${localStorage[key]}</td><td onclick='localStorage.removeItem("${key}");$(this).parent().remove()'>löschen</td></tr>`
                }
                var table2 = '<table class="table-divider striped"><thead><tr><th>Session-Storage: Key</th><th>Value</th></tr><tbody>'
                for (var i = 0; i < sessionStorage.length; i++) {
                    key = sessionStorage.key(i);
                    table2 += `<tr><td>${key}</td><td>${sessionStorage[key]}</td><td onclick='sessionStorage.removeItem("${key}");$(this).parent().remove()'>löschen</td></tr>`
                }
                table += '</tbody></table>'
                table2 += '</tbody></table>'
                noticeModal('Gescheicherte Daten', `<div style="height: 200px;overflow:auto">Hier siehst du, welche Daten im sog. local- & session-Storage gespeichert wurden. Davon ausgenommen sind sog. indexDB und Cookies${table}${table2}</div>`)
            })
            //import
            frame.contents().find('#importSettings').on('click', async () => {
                //alerts wrong data
                function invalid() {
                    noticeModal('Fehler beim Importieren der Codebase-Einstellungen', 'Einstellungen nicht valide', 'Schließen')
                }
                //asks for data string
                var newSettings = await inputModal({
                    title: 'Codebase-Einstellungen importieren',
                    label: 'Gib hier deine Einstellungen ein:',
                    placeholder: 'Gib hier die Codebase-Einstellungen ein'
                });
                var error;
                //try to parse string
                try {
                    var newSettingsObject = JSON.parse(newSettings)
                } catch (e) {
                    //if error show dialog
                    invalid()
                    error = true;
                }
                //if no error save
                if (!error) {
                    localStorage.storage_resi_base = newSettings;
                    reload()
                }
            })
            //export
            frame.contents().find('#exportSettings').on('click', () => {
                noticeModal('Codebase-Einstellungen exportieren', `Hier kannst du deine Einstellungen kopieren und an Freunde weitergeben:<div style='overflow:auto'><code>${JSON.stringify(s)}</code></div><br><button class="button button-round button-success" id="shareSettings">In Zwischenablage kopieren</button>`)
                $('#shareSettings').on('click', (e) => {
                    navigator.clipboard.writeText(JSON.stringify(s)).then(() => {
                        $(e.currentTarget).html('Kopiert!');
                    })
                })
            });
            frame.contents().find('#resetStorage').on('click', () => {
                modal('Alle Einstellungen zurücksetzen', 'Willst du wirklich alle Einstellungen zurücksetzten? Die aktuellen Einstellungen sind dann unwiderruflich verloren!', 'Ja, zurücksetzen', 'Nein, behalten', () => {
                    localStorage.storage_resi_base = JSON.stringify(buildDefaultStorage());
                    reload()
                }, () => {});
            })
            //save settings
            function saveCodebaseSettings() {
                checkSettings();
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
            frame.contents().find('#saveCodebaseSettings').on('click', saveCodebaseSettings);
            frame.off('load');
        });
    });
    //run functions
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
    //write log on main site
    if (window.location.pathname == '/') {
        var log = `Running ${GM_info.script.name} in Version ${GM_info.script.version} on site ${window.location.href}!`
        modules.forEach((el) => {
            log += `\n${el.name}: ${s[el.settingsTarget] ? '✔ aktiv' : '✘ inaktiv'}`
        })
        log += `\nDas Team der Codebase wünscht viel Spaß!
Bei Fehlern kopiere bitte diesen Text und füge ihn in deine Fehlermeldung ein. Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen.`;
        console.log(log);
    }
    $('.openCodebaseSettings').on('click', () => {
        $('#Codebase').click()
    })
})();