(function () {
    if (!localStorage.configControlCenterNiZi112) {
        return;
    }
    try {
        const globalConfig = JSON.parse(localStorage.configControlCenterNiZi112);
    } catch (e) {
        noticeModal('Fehler beim Laden der Leitstelle', 'Die Leitstelle konnte nicht geladen werden. Bitte überprüfe deine Einstellungen. Besteht der Fehler weiterhin, wende dich an den NiZi112.');
        return;
    }
    if (!globalConfig) {
        return;
    }
    //script vom server
    function keywordsAd() {
        let worte = globalConfig.keywordsInAd ?? [];
        var html_string = "<span style='overflow:auto'>"
        for (var i = 0; i < worte.length; i++) {
            html_string += `<span onclick='$("#iframe").contents().find("#patientDiagnose").val(this.innerHTML)'>${worte[i]}</span><br>`;
        };
        html_string += "</span>"
        $("#ad").append(html_string);
    };

    function colorAlarm() {
        let newStyleElement = document.createElement("style");
        newStyleElement.innerHTML = "#missionForm{border-color: light green; color: light green;} #missionForm:hover{background-color: yellow; color: red; border-color: red;}"
        document.head.appendChild(newStyleElement);
    };

    function bigMap() {
        $(document).ready(() => {
            setTimeout(function () {
                toggleMap();
            }, 1000)
            $('header').remove();
        });
    };

    function chatMessage() {
        socket.on("associationMessage", (msg) => {
            if (msg.message && msg.userName != ReSi.userName) {
                systemMessage({
                    'title': msg.userName,
                    'message': `${msg.message}`,
                    'type': 'info',
                    'timeout': 3000,
                });
            }
        });
    }

    function wordsChat() {
        'use strict';
        const orte = globalConfig.wordsInChat ?? [];
        const orte2 = globalConfig.wordsInChat2 ?? [];
        var html_string = "<div class='panel-headline'></div><span style='overflow: auto;'>"
        for (var j = 0; j < orte.length; j++) {
            html_string += `<span style="width:49%;display:inline-block" onclick='$("#iframe").contents().find("#newMissionCityInput").val(this.innerHTML)'>${orte[j]}</span><span style="width:49%; display:inline-block" onclick='$("#iframe").contents().find("#newMissionCityInput").val(this.innerHTML)'>${orte2[j] ?? '<i>leer</i>'}</span><br>`;
        };
        html_string += "</span>"
        $("#chat").html(html_string);
    };

    function greet() {
        let greetText = globalConfig.greetText ?? '';
        systemMessage({
            'title': 'Willkommen zurück:',
            'message': greetText.replaceAll('%calls%', parseInt($(".call-next").text()) + 1).replaceAll('%missions%', $(".mission-list-icon-1").length),
            'type': 'info',
            'timeout': 10000,
        });
    };

    function wordsMissionAlarm() {
        'use strict';
        const worte = globalConfig.freeText1 ?? [];
        const worte2 = globalConfig.freeText2 ?? [];
        var zahl = Math.max(worte.length, worte2.length);
        var html_string = `<script>
        function replaceFunc(text){
          text = text.replace(/%text%/g, $("#newMissionCustomText").val());
          text = text.replace(/%ort%/g, $("#newMissionCityInput").val());
          text = text.replace(/%straße%/g, $("#newMissionRoadInput").val());
          text = text.replace(/%nummer%/g, $("#newMissionHousenumberInput").val());
          text = text.replace(/%name%/g, $("#newNameInput").val());
          text = text.replace(/%stichwort%/g, $("#newMissionNameInput").val());
          return text;
        };
        </script>
        <table class="striped table-divider"><thead></thead><tbody>`;
        for (var i = 0; i < zahl; i++) {
            html_string += `<tr><td onclick='$("#newMissionCustomText").val(replaceFunc(this.innerText));'>${worte[i]}</td><td onclick='$("#newMissionCustomText").val(replaceFunc(this.innerText));'>${worte2[i]}</td></tr>`;
        };
        html_string += "</tbody></table>"
        $(".panel-body").append(html_string);
    };

    function statusSendInChat() {
        const worte = globalConfig.statusSendInChat ?? [];
        let html = '<div>';
        for (var i = 0; i < worte.length; i++) {
            html += `<input type='radio' class='sendStatus' val='${worte[i]}' name='statusCheck' id='check_${i}'><label for='check_${i}' class='labelChatSend'>${worte[i]}</label><br>`;
        };
        html += '<button class="button button-round button-success" id="sendMessageStatus" style="margin-top:10px;">Status senden</button></div>';
        $('#ad').append(html);
        $('#sendMessageStatus').on('click', function () {
            if ($('.sendStatus.active').length != 1) {
                noticeModal('Fehler', 'Du musst einen Status auswählen! Wenn ein Status ausgewählt ist, wähle ihn bitte nochmal aus!', 'Schließen');
                return;
            };
            var für = $(".sendStatus.active").attr("id");
            try {
                var query = document.querySelectorAll(`.labelChatSend[for='${CSS.escape(für)}']`)[0];
            } catch (e) {
                noticeModal('Fehler', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
            };
            if (worte.indexOf(query.innerText) == -1 || !query.innerText) {
                noticeModal('Fehler', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
            }
            $.ajax({
                url: "/api/sendAssociationChatMessage",
                dataType: "json",
                type: "POST",
                data: {
                    "message": query.innerText,
                },
                success: function (r) {}
            });
            $('.sendStatus.active').removeClass('active');
        });
        $('.sendStatus').on('click', function (e) {
            $('.sendStatus.active').removeClass('active');
            $(e.target).addClass('active');
        });
    };

    function newWindow() {
        let darkMode = globalConfig.usesDarkmode ?? false; // true oder false
        let missionNames = globalConfig.missionNamesInOpenFrame ?? [];
        function getListFromArray(arrayList, className) {
            let list = '<table class="table-divider striped"><tbody>';
            arrayList.forEach((el) => {
                list += '<tr>';
                el.forEach((e) => {
                    list += `<td class="${className}">${e}</td>`;
                });
                list += '</tr>';
            });
            list += '</tbody></table>';
            return list;
        }

        function buildFrameContent() {
            return `<h2>Alarmstichworte:</h2>
        ${getListFromArray(missionNames, 'missionName')}
        <br>`
        }

        function openWindow() {
            let newWindow;
            if ((newWindow == null) || (newWindow.closed) || (!newWindow)) {
                newWindow = window.open('', "Intelligenter Helfer für alles Mögliche",
                    "width=1400 (360),height=524,resizable=yes,status=no," +
                    "menubar=no,location=no,scrollbars=no,toolbar=no,top=63,left=0");
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
            if (darkMode) newWindow.document.body.classList.add('dark');
            $('.missionName', newWindow.document).on('click', (e) => {
                $('#newMissionNameInput').val(replaceFunc($(e.target).text()));
            });
            $('.street', newWindow.document).on('click', (e) => {
                $('#newMissionRoadInput').val(replaceFunc($(e.target).text()));
            });
            $('.houseNumber', newWindow.document).on('click', (e) => {
                $('#newMissionHousenumberInput').val(replaceFunc($(e.target).text()));
            });
            $('.city', newWindow.document).on('click', (e) => {
                $('#newMissionCityInput').val(replaceFunc($(e.target).text()));
            });
            $('.freeText', newWindow.document).on('click', (e) => {
                $('#newMissionCustomText').val(replaceFunc($(e.target).text()));
            });
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
        //openWindow();
    }

    function imageInRadio() {
        if (globalConfig.imageURL != '') $('#radio .panel-body').append(`<img src="${globalConfig.imageURL}">`);
    }
    (function () {
        'use strict';
        $('#iframe').css('z-index', '20');
        if (window.location.href.includes('/missionNew/')) {
            //case new Mission
            //Stichworte unter den Alarmbuttons
            wordsMissionAlarm();
            newWindow();
        } else if (window.location.href.endsWith('#dispo=true') || window.location.href.endsWith('&dispo=true') || window.location.href.includes('#dispo=true') || window.location.href.includes('&dispo=true')) {
            //case disposition
            //Stichwörter in der Anzeige
            keywordsAd();
            //eingefärbter Alarmbutton
            if (globalConfig.colorAlarmBtnActive) colorAlarm();
            //große Karte
            //bigMap();
            //Nachricht bei Chatmessage
            chatMessage();
            //begrüßung
            greet();
            //Sachen im Chat
            wordsChat()
            //Image in Funk
            imageInRadio();
            $('#ad').css({
                'grid-area': '1 / 1 / 4 / 2',
                'z-index': '2'
            });
            $('#map').hide();
            $('#departments').hide();
            $('#missions').css({
                'grid-area': '1 / 3 / 4 / 4',
                'z-index': '2'
            });
            $('#radio').css({
                'grid-area': '1 / 4 / 4 / 5',
                'z-index': '2'
            });
        } else if (window.location.href.endsWith('#other=true') || window.location.href.endsWith('&other=true') || window.location.href.includes('#other=true') || window.location.href.includes('&other=true')) {
            //case other
            $('#map').hide();
            $('#missions').hide();
            $('#calls').hide();
            $('#radio').hide();
            $('#ad').css({
                'grid-area': '1 / 2 / 4 / 3',
                'z-index': '2'
            });
            $('#departments').css({
                'grid-area': '1 / 3 / 4 / 5',
                'z-index': '2'
            });
            $('#chat').css({
                'grid-area': '1 / 1 / 4 / 2',
                'z-index': '2'
            });
            $('#ad').append(`<textarea class='input-round' rows='10' autocomplete='off' id='notes_nizi_resi'>${localStorage.notesNiZi}</textarea>
            <button class='button button-round button-success' style="margin-bottom:10px;" onclick='localStorage.notesNiZi = $("#notes_nizi_resi").val();'>Speichern</button>`);
            statusSendInChat();
        } else if (window.location.href.endsWith('#map=true') || window.location.href.endsWith('&map=true') || window.location.href.includes('#map=true') || window.location.href.includes('&map=true')) {
            //case map
            bigMap();
        } else if (window.location.href.endsWith('#alliance=true') || window.location.href.endsWith('&alliance=true') || window.location.href.includes('#alliance=true') || window.location.href.includes('&alliance=true')) {
            //case alliance
            $('#departments').hide();
            $('#calls').hide();
            $('#radio').hide();
            $('#chat').css({
                'grid-area': '1 / 4 / 4 / 4',
                'z-index': '2'
            }).find('.panel-headline').text('Protokolle');
            $('#chat #chatMessages').hide();
            $('#chat #missionLog').removeClass('hidden');
            $('#missions').css({
                'grid-area': '1 / 2 / 4 / 2',
                'z-index': '2'
            }).find('.panel-headline').text('Eigene Einsätze');
            $('#radio').css({
                'grid-area': '1 / 3 / 4 / 3',
                'z-index': '2',
                'display': 'block',
            }).find('.panel-headline').text('Geteilte Einsätze');
            $('#radio .panel-body').html('').css('overflow', 'auto');
            $('#radio .panel-body').html($('#sharedMissions').html());
            $('#radio').attr('id', 'missions').addClass('sharedMissionsNiZi missions-container');

            function update() {
                setTimeout(() => {
                    $('.sharedMissionsNiZi .panel-body').html($('#sharedMissions').html());
                }, 100);
            }
            socket.on("newMission", () => update());
            socket.on("missionStatus", () => update());
            socket.on("finishMission", () => update());
        } else {
            systemMessage({
                message: 'Keine Funktionen für diese Seite implementiert.<br>Bitte nutze <a href="https://rettungssimulator.online/#dispo=true">https://rettungssimulator.online/#dispo=true</a>, <a href="https://rettungssimulator.online/#other=true">https://rettungssimulator.online/#other=true</a>, <a href="https://rettungssimulator.online/#map=true">https://rettungssimulator.online/#map=true</a> oder <a href="https://rettungssimulator.online/#alliance=true">https://rettungssimulator.online/#alliance=true</a>.',    
                type: 'warning',
                title: 'Keine Funktion der Leitstelle auf dieser Seite'
            });
        };
    })();
})();