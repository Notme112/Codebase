// ==UserScript==
// @name         ReSi-Codebase
// @version      1.4.0
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @include      www.rettungssimulator.online
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/NiZi112/Codebase/raw/main/code.user.js
// @downloadURL  https://github.com/NiZi112/Codebase/raw/main/code.user.js
/* global $ sounds openFrame socket*/
// ==/UserScript==

(function() {
    'use strict';
    var storage;
    //Start Storage-Abfrage
    if(!localStorage.getItem("storage_resi_base")){
        localStorage.setItem("storage_resi_base", JSON.stringify({'toplist': false, 'gesamtmuenzen': false, 'einsatzzealer': false, 'einsatzliste_max': false, 'flogout': false, 'autocomplete': false, 'streamer': false, 'sounds': false, 'einsatzzaeler': false, 'chat_alarm': false, 'push_fms': false, 'zeitwechsel': false, 'uhr': false}));
    }else{
        storage = JSON.parse(localStorage.storage_resi_base);
        var toplist_aktiv = storage.toplist;
        var gesamtmuenzen_aktiv = storage.gesamtmuenzen;
        var einsatzliste_max_aktiv = storage.einsatzliste_max;
        var flogout_aktiv = storage.flogout;
        var autocomplete_aktiv = storage.autocomplete;
        var sounds_aktiv = storage.sounds;
        var streamer_aktiv = storage.streamer;
        var chat_alarm_aktiv = storage.chat_alarm;
        var push_fms_aktiv = storage.push_fms;
        var zeitwechsel_aktiv = storage.zeitwechsel;
        var uhr_aktiv = storage.uhr;
        var einsatzzaehler_aktiv = storage.einsatzzaeler;
    };
    //Start löschen ENTFERNEN!!
    localStorage.removeItem("toplist_aktiv_resi_base")
    localStorage.removeItem("gesamtmuenzen_aktiv_resi_base")
    localStorage.removeItem("einsatzliste_max_aktiv_resi_base");
    localStorage.removeItem("flogout_aktiv_resi_base");
    localStorage.removeItem("autocomplete_aktiv_resi_base");
    localStorage.removeItem("streamer_aktiv_resi_base");
    localStorage.removeItem("sounds_aktiv_resi_base");
    localStorage.removeItem("streamer_aktiv_resi_base");
    localStorage.removeItem("chat_alarm_aktiv_resi_base");
    localStorage.removeItem("push_fms_aktiv_resi_base");
    localStorage.removeItem("zeitwechsel_aktiv_resi_base");
    localStorage.removeItem("uhr_aktiv_resi_base");
    //Ende löschen ENTFERNEN!!
    if(!localStorage.getItem('chat_alarm_audio_resi_base')){
        localStorage.setItem("chat_alarm_audio_resi_base", "");
    };
    if(!localStorage.getItem('newCall_audio_resi_base')){
        localStorage.setItem("newCall_audio_resi_base", "");
    };
    if(!localStorage.getItem('fms_audio_resi_base')){
        localStorage.setItem("fms_audio_resi_base", "");
    };
    if(!localStorage.getItem('fms5_audio_resi_base')){
        localStorage.setItem("fms5_audio_resi_base", "");
    };
    if(!localStorage.getItem('error_audio_resi_base')){
        localStorage.setItem("error_audio_resi_base", "");
    };
    if(!localStorage.getItem('stream_text_resi_base')){
        localStorage.setItem("stream_text_resi_base", "Es handelt sich um ein Spiel mit fiktiven Einsätzen, es sind keine echten Szenarien!");
    };
    if(!localStorage.getItem('finish_audio_resi_base')){
        localStorage.setItem("finish_audio_resi_base", "");
    };
    if(!localStorage.getItem('uhr_min_resi_base')){
        localStorage.setItem("uhr_min_resi_base", "7");
    };
    if(!localStorage.getItem('uhr_max_resi_base')){
        localStorage.setItem("uhr_max_resi_base", "19");
    };
    if($("#darkMode").html().includes("Tag")){localStorage.setItem("darkmode_resi_base", "true");}else{localStorage.setItem("darkmode_resi_base", "false");};
    var btn = document.getElementById("darkMode");
    btn.addEventListener("click", function() {if(localStorage.getItem("darkmode_resi_base") == "true"){localStorage.setItem("darkmode_resi_base", "false");}else{localStorage.setItem("darkmode_resi_base", "true");};});
    //Ende Storage-Abfrage
    //Start eigener Frame
    var listenelement = document.createElement("li");
    var vater = $("#darkMode");
    vater.after(listenelement)
    listenelement.innerHTML = "ReSi-Codebase";
    $(listenelement).on("click", () => {
        openFrame("", "1/1/4/5");
        let frame = $("#iframe");
        frame.on("load", () => {
            frame.contents().find("body").append(`<div class='panel-body'>
            <script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script>
            <link rel='stylesheet' href='css/index.css?v=0.6a' charset='utf-8'>
            <script src='https://rettungssimulator.online/js/index.js?v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/iframe.js?new=true&v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/controlCenter.js?v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/tippy.js?v=0.6.1e'></script>
            <script>
            if(localStorage.getItem('darkmode_resi_base')=='true'){document.getElementsByTagName('body')[0].classList.add('dark');};
            var aenderungen = false;
            $('.checkbox-container').on('click', function(){aenderungen = true; console.log(aenderungen)})
            $('.input-round').on('keydown', function(){aenderungen = true;console.log(aenderungen)})
            var speichern = function(){
            gesamtmuenzen_aktiv = document.getElementById('gesamtmuenzen_check').checked;
            toplist_aktiv = document.getElementById('toplist_check').checked;
            einsatzliste_max_aktiv = document.getElementById('einsatzliste_max_check').checked;
            flogout_aktiv = document.getElementById('flogout_check').checked;
            autocomplete_aktiv = document.getElementById('autocomplete_check').checked;
            streamer_aktiv = document.getElementById('streamer_check').checked;
            sounds_aktiv = document.getElementById('sounds_check').checked;
            chat_alarm_aktiv = document.getElementById('chat_alarm_check').checked;
            einsatzzaehler_aktiv = document.getElementById('einsatzaehler_check').checked;
            push_fms_aktiv = document.getElementById('push_fms_check').checked;
            zeitwechsel_aktiv = document.getElementById('zeitwechsel_check').checked;
            uhr_aktiv = document.getElementById('uhr_check').checked;
            localStorage.setItem("storage_resi_base", JSON.stringify({'toplist': toplist_aktiv, 'gesamtmuenzen': gesamtmuenzen_aktiv, 'einsatzzealer': einsatzzaehler_aktiv, 'einsatzliste_max': einsatzliste_max_aktiv, 'flogout': flogout_aktiv, 'autocomplete': autocomplete_aktiv, 'streamer': streamer_aktiv, 'sounds': sounds_aktiv, 'einsatzzaeler': einsatzzaehler_aktiv, 'chat_alarm': chat_alarm_aktiv, 'push_fms': push_fms_aktiv, 'zeitwechsel': zeitwechsel_aktiv, 'uhr': uhr_aktiv}));
            var sound_input_chat = $('#sound_chat_input').val();
            localStorage.setItem('chat_alarm_audio_resi_base', valide(sound_input_chat));
            var sound_input_fms = $('#sound_fms_input').val();
            localStorage.setItem('fms_audio_resi_base', valide(sound_input_fms));
            var sound_input_fms5 = $('#sound_fms5_input').val();
            localStorage.setItem('fms5_audio_resi_base', valide(sound_input_fms5));
            var sound_input_error = $('#sound_error_input').val();
            localStorage.setItem('error_audio_resi_base', valide(sound_input_error));
            var sound_input_newCall = $('#sound_newCall_input').val();
            localStorage.setItem('newCall_audio_resi_base', valide(sound_input_newCall));
            var sound_input_finish = $('#sound_finish_input').val();
            localStorage.setItem('finish_audio_resi_base', valide(sound_input_finish));
            var text_input_stream = $('#text_stream_input').val();
            localStorage.setItem('stream_text_resi_base', valide(text_input_stream));
            var uhr_min_input = $('#uhr_min_input').val();
            localStorage.setItem('uhr_min_resi_base', valide(uhr_min_input));
            var uhr_max_input = $('#uhr_max_input').val();
            localStorage.setItem('uhr_max_resi_base', valide(uhr_max_input));
            window.top.location.reload()
            };
            storage = JSON.parse(localStorage.storage_resi_base);
            var toplist_aktiv = storage.toplist;
            var gesamtmuenzen_aktiv = storage.gesamtmuenzen;
            var einsatzliste_max_aktiv = storage.einsatzliste_max;
            var flogout_aktiv = storage.flogout;
            var autocomplete_aktiv = storage.autocomplete;
            var sounds_aktiv = storage.sounds;
            var streamer_aktiv = storage.streamer;
            var chat_alarm_aktiv = storage.chat_alarm;
            var push_fms_aktiv = storage.push_fms;
            var zeitwechsel_aktiv = storage.zeitwechsel;
            var uhr_aktiv = storage.uhr;
            var einsatzzaehler_aktiv = storage.einsatzzaeler;
            if(toplist_aktiv){$('#toplist_check').attr('checked', true);}
            if(gesamtmuenzen_aktiv){$('#gesamtmuenzen_check').attr('checked', true);}
            if(flogout_aktiv){$('#flogout_check').attr('checked', true);}
            if(einsatzliste_max_aktiv){$('#einsatzliste_max_check').attr('checked', true);}
            if(streamer_aktiv){$('#streamer_check').attr('checked', true);}
            if(autocomplete_aktiv){$('#autocomplete_check').attr('checked', true);}
            if(einsatzzaehler_aktiv){$('#einsatzaehler_check').attr('checked', true);};
            if(chat_alarm_aktiv){$('#chat_alarm_check').attr('checked', true);};
            if(push_fms_aktiv){$('#push_fms_check').attr('checked', true);};
            if(zeitwechsel_aktiv){$('#zeitwechsel_check').attr('checked', true);};
            if(uhr_aktiv){$('#uhr_check').attr('checked', true);};
            if(sounds_aktiv){$('#sounds_check').attr('checked', true);};
            $('#uhr_min_input').val(parseInt(localStorage.getItem('uhr_min_resi_base')));
            $('#uhr_max_input').val(parseInt(localStorage.getItem('uhr_max_resi_base')));
            $('#sound_newCall_input').val(localStorage.getItem('newCall_audio_resi_base'));
            $('#sound_error_input').val(localStorage.getItem('error_audio_resi_base'));
            $('#sound_fms_input').val(localStorage.getItem('fms_audio_resi_base'));
            $('#sound_fms5_input').val(localStorage.getItem('fms5_audio_resi_base'));
            $('#sound_finish_input').val(localStorage.getItem('finish_audio_resi_base'));
            $('#text_stream_input').val(localStorage.getItem('stream_text_resi_base'));
            $('#text_chat_input').val(localStorage.getItem('chat_alarm_audio_resi_base'));
            var valide = function(wert){
            var ausgabe='';
            for (var i=0; i < wert.length; i++) {
            if(wert[i]=='<'){ausgabe += ''}else if(wert[i]== '>'){ausgabe += ''}else{ausgabe += wert[i]};};
            console.log(ausgabe);
            return ausgabe
            ;};
            $('body').on('keyup', function(e){if(e.keyCode===27){$(".right").click();}});
            </script>
            <div class='detail-header'>
            <div class='detail-title'>ReSi-Codebase <div class='right' onclick='if(aenderungen==true){modal("Ohne Speichern verlassen?", "Du hast Änderungen vorgenommen, willst du diese Seichern?", "Speichern", "Ohne speichern verlassen", speichern, cancel = function(){window.parent.closeFrame()})}else{window.parent.closeFrame()}'> X </div></div>
            <div class='detail-subtitle'>Verwalte hier deine Einstellungen für die ReSi-Codebase</div>
            </div>
            <div class='tabs tabs-horizotal'>
            <div class='tab tab-active' for='settings-moduls'>Module</div>
            <div class='tab' for='settings-inputs'>Texte & URL's</div>
            <div class='tab' for='licence'>Lizenzen</div>
            </div>
            <div class='tab-container'>
            <div class='tab-content tab-content-active' id='tab_settings-moduls'>
            <h2>Module:</h2>
            <div class='checkbox-container'><input id='gesamtmuenzen_check' type='checkbox'><label for='gesamtmuenzen_check'>Gesamtmünzenzähler aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Gesamtm%C3%BCnzenz%C3%A4hler' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='toplist_check' type='checkbox'><label for='toplist_check'>Topliste aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Toplist-Position' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='einsatzliste_max_check' type='checkbox'><label for='einsatzliste_max_check'>Maximierte Einsatzliste aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Maximierte-Einsatzliste' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='flogout_check' type='checkbox'><label for='flogout_check'>FastLogout aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Flogout' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='streamer_check' type='checkbox'><label for='streamer_check'>Eigenen Streammode-Text aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Eigener-Streammode-Text' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='sounds_check' type='checkbox'><label for='sounds_check'>Eigene Sounds aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Eigene-Sounds' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='autocomplete_check' type='checkbox'><label for='autocomplete_check'>Autocomplet verhindern aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Autocomplete-verhindern' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='einsatzaehler_check' type='checkbox'><label for='einsatzaehler_check'>Einsatzzähler aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Einsatzz%C3%A4hler' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input id='chat_alarm_check' type='checkbox'><label for='chat_alarm_check'>Chat-Alarm aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Chat-Alarm' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='push_fms_check'><label for='push_fms_check'>Push-FMS5 aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Push-FMS5' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='zeitwechsel_check'><label for='zeitwechsel_check'>Wechsel in den Darkmode nach Uhrzeit aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Darkmode-nach-Uhrzeit' target='_blank' title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <div class='checkbox-container'><input type='checkbox' id='uhr_check' ><label for='uhr_check'>Uhr aktivieren<a class='no-prevent' href='https://github.com/NiZi112/Codebase/wiki/Uhr' target="_blank" title='Hilfe zu diesem Modul'> [?] </a></label></div>
            <button class="button-success button button-round" onclick='speichern()'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_settings-inputs'>
            <h2>Texte & URL's:</h2>
            <div class='input-container'><div class='input-label'>Neuer-Anruf-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_newCall_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>FMS-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_fms_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>FMS-5-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_fms5_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Mission-fertiggestellt-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_finish_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Error-Alarm-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_error_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Streammode-Text (TEXT)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='text_stream_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Chat-Alarm-Sound (URL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='sound_chat_input' placeholder='Link'></div>
            <div class='input-container'><div class='input-label'>Darkmode ausschalten um ... Uhr (ZAHL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='uhr_min_input' type='number'></div>
            <div class='input-container'><div class='input-label'>Darkmode einschalten um ... Uhr (ZAHL)</div><div class='input-icon'></div><input class='input-round' autocomplete='off' id='uhr_max_input' type='number'></div><br>
            <button class="button-success button button-round" onclick='speichern()'>Speichern</button>
            </div>
            <div class='tab-content' id='tab_licence'>
            <h2>Open-Source:</h2>
            <p>
            Icons:
            Icons by <a href='https://fontawesome.com/' target='_blank'><u>Fontawesome</u></a> unter <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank'><u>CC-BY 4.0-Lizenz</u></a>.
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
            </div>`);
            frame.off("load");
        })
    });
    //Ende eigener Frame
    //Start function-definding
    const gesamtmuenzenanzeiger = function(){
        $.ajax({
            url: "/api/user",
            dataType: "json",
            type : "GET",
            success : function(r) {
                $("#darkMode").after(`<li>${r.muenzenTotal.toLocaleString()} Münzen</li>`);
            }});
    };
    const einsatzliste_max = function(){
        $(".panel-expand").children().eq(0).click();
    };
    const flogout = function(){
        const platz = document.getElementsByClassName("brand-img")[0];
        platz.style.display="inline";
        platz.style.paddingRight = "20px";
        platz.innerHTML='<i class="fas fa-sign-out-alt"></i>';
        platz.addEventListener("click", function(){ $.ajax({
            url: "/api/deauthenticate",
            type : "GET",
            success : function(r) {
                window.location.reload();
            }
        }); });
    };
    const autocomplete = function(){
        $("#chatInput").attr("autocomplete", "off");
        $("#newMissionNameInput").attr("autocomplete", "off");
        $("#newNameInput").attr("autocomplete", "off");
        $("#newMissionRoadInput").attr("autocomplete", "off");
        $("#newMissionHousenumberInput").attr("autocomplete", "off");
        $("#newMissionCityInput").attr("autocomplete", "off");
    };
    const streamerinfos = function(){
        const text = "<div class='panel-headline'>Streamer-Modus</div><p class='label label-info'>" + localStorage.getItem("stream_text_resi_base") + "</p>";
        $("#chat").html(text);
    };
    const toplist = function(){
        if(sessionStorage.getItem("topliste_nizi") === null){
            $.ajax({
                url: "/api/user",
                dataType: "json",
                type : "GET",
                success : function(r) {
                    document.getElementsByClassName("frame-opener")[5].innerHTML = "Topliste: " + r.toplistRank;
                }
            });};
    };
    const custom_sounds = function(){
        const audioElement_fms = new Audio(localStorage.getItem("fms_audio_resi_base"));
        sounds.radioFMS= audioElement_fms;
        const audioElement_call = new Audio(localStorage.getItem("newCall_audio_resi_base"));
        sounds.newCall= audioElement_call;
        const audioElement_fms5 = new Audio(localStorage.getItem("fms5_audio_resi_base"));
        sounds.radioFMS= audioElement_fms5;
        const audioElement_mission = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.finishedMission= audioElement_mission;
        const audioElement_error = new Audio(localStorage.getItem("error_audio_resi_base"));
        sounds.error= audioElement_error;
    };
    const chat_alarm = function(){
        socket.on("associationMessage", (associationMessageObject) =>{
            var audio_chat = new Audio(localStorage.getItem('chat_alarm_audio_resi_base'))
            audio_chat.play();

        });
    };
    const einsatzzaehler = function(){
        const datum = new Date();
        const datum_heute = datum.getDate()
        if(!localStorage.getItem("finished_missions_nizi")){localStorage.setItem("finished_missions_nizi", "0")};
        if(!localStorage.getItem("finished_missions_nizi_time")){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
        if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi", "0")};
        if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
        const neue_liste = document.createElement("li");
        neue_liste.innerHTML = "Einsätze heute: " + localStorage.finished_missions_nizi;
        $("#darkMode").after(neue_liste);
        socket.on("finishMission", (userMissionID) =>{
            var mission = localStorage.finished_missions_nizi;
            mission ++;
            localStorage.finished_missions_nizi = mission;
            neue_liste.innerHTML = "Einsätze heute: " + mission;
        });
    };
    var push_fms = function(){
        function notifyMe() {
            if (Notification.permission === "granted") {
                var news = true;
            }
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (permission === "granted") {
                        news = true;
                    }
                });
            }
        }
        notifyMe();

        socket.on("vehicleFMS", (vehicleFMSObject) =>{
            var hallo = `${vehicleFMSObject.userVehicleFMS}`;
            if(hallo.includes("5")){
                new Notification("Sprechwunsch!", {body:`Dein Fahrzueg ${vehicleFMSObject.userVehicleFMS} im Rettungssimulator hat einen Sprechwunsch! Bitte bearbeite diesen!`});
            }
        }
                 );
    };
    var zeitwechsel = function(){
        var überprüfen = function(){
            const min = parseInt(localStorage.getItem("uhr_min_resi_base"));
            const max = parseInt(localStorage.getItem("uhr_max_resi_base"));
            const date = new Date();
            const tag = $("#darkMode").html();
            if(min < date.getHours() && max > date.getHours() && tag.includes("Tag")){
                $("#darkMode").click();
            }else if(min > date.getHours() || max < date.getHours() && tag.includes("Nacht")){
                $("#darkMode").click();
            }
        }
        setInterval(überprüfen(), 3000);
    };
    const uhr = function(){
        const hallo = document.createElement("div");
        document.getElementsByClassName("brand")[0].after(hallo);
        const aktualisieren= function(){
            const date = new Date();
            const stunde = date.getHours();
            const minute = date.getMinutes();
            const sekunde = date.getSeconds();
            if(sekunde < 10){sekunde = "0" + sekunde};
            if(minute < 10){minute = "0" + minute};
            hallo.innerHTML = stunde + " : " + minute + " Uhr"
        };
        setInterval(aktualisieren, 50)
    };
    //Ende function-definding
    //Start ausführen
    if(toplist_aktiv == true){toplist();};
    if(gesamtmuenzen_aktiv == true){gesamtmuenzenanzeiger();};
    if(flogout_aktiv == true){flogout();};
    if(autocomplete_aktiv == true){autocomplete();};
    if(streamer_aktiv == true){streamerinfos()};
    if(einsatzliste_max_aktiv == true){einsatzliste_max();};
    if(sounds_aktiv == true){custom_sounds();};
    if(chat_alarm_aktiv == true){chat_alarm();};
    if(einsatzzaehler_aktiv == true){einsatzzaehler();};
    if(push_fms_aktiv == true){push_fms();};
    if(zeitwechsel_aktiv == true){zeitwechsel();};
    if(uhr_aktiv == true){uhr();};
    console.log(`Running ReSi-Codebase in Version 1.4.0!
- Topliste: ${toplist_aktiv};
- Gesamtmünzen: ${gesamtmuenzen_aktiv};
- Flogout: ${flogout_aktiv};
- Autocomplete: ${autocomplete_aktiv};
- Streamer: ${streamer_aktiv};
- Einsatzliste: ${einsatzliste_max_aktiv};
- Sounds: ${sounds_aktiv};
- Chat-Alarm: ${chat_alarm_aktiv};
- Einsatzzähler: ${einsatzzaehler_aktiv};
- Push-FMS: ${push_fms_aktiv};
- Uhr: ${uhr_aktiv};
- Darkmode nach Zeit: ${zeitwechsel_aktiv};
Das Team der Codebase wünscht viel Spaß!
Bei Fehlern, kopiere bitte diesen Text und füg ihn in deine Fehlermeldung ein!
Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen!;`)
    //Ende auführen
})();
