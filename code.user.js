// ==UserScript==
// @name         ReSi-Codebase BETA
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @include      www.rettungssimulator.online
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/NiZi112/Codebase/raw/main/code.user.js
// @downloadURL  https://github.com/NiZi112/Codebase/raw/main/code.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //Start Storage-Abfrage
    if(!localStorage.getItem('toplist_aktiv_resi_base')){
        var toplist_aktiv = false;
        localStorage.setItem("toplist_aktiv_resi_base", false)
    }else{
        toplist_aktiv = localStorage.getItem("toplist_aktiv_resi_base");
    };
    if(!localStorage.getItem('gesamtmuenzen_aktiv_resi_base')){
        var gesamtmuenzen_aktiv = false;
        localStorage.setItem("gesamtmuenzen_aktiv_resi_base", false)
    }else{
        gesamtmuenzen_aktiv = localStorage.getItem("gesamtmuenzen_aktiv_resi_base");
    };
    if(!localStorage.getItem('einsatzliste_max_aktiv_resi_base')){
        var einsatzliste_max_aktiv = false;
        localStorage.setItem("einsatzliste_max_aktiv_resi_base", false);
    }else{
        einsatzliste_max_aktiv = localStorage.getItem("einsatzliste_max_aktiv_resi_base");
    };
    if(!localStorage.getItem('flogout_aktiv_resi_base')){
        flogout_aktiv = false;
        localStorage.setItem("flogout_aktiv_resi_base", false);
    }else{
        var flogout_aktiv = localStorage.getItem("flogout_aktiv_resi_base");
    };
    if(!localStorage.getItem('autocomplete_aktiv_resi_base')){
        var autocomplete_aktiv = false;
        localStorage.setItem("autocomplete_aktiv_resi_base", false);
    }else{
        autocomplete_aktiv = localStorage.getItem("autocomplete_aktiv_resi_base");
    };
    if(!localStorage.getItem('streamer_aktiv_resi_base')){
        var streamer_aktiv = false;
        localStorage.setItem("streamer_aktiv_resi_base", false);
    }else{
        streamer_aktiv = localStorage.getItem("streamer_aktiv_resi_base")
    };
    if(!localStorage.getItem('sounds_aktiv_resi_base')){
        var sounds_aktiv = false;
        localStorage.setItem("sounds_aktiv_resi_base", false);
    }else{
        sounds_aktiv = localStorage.getItem("sounds_aktiv_resi_base")
    };
    if(!localStorage.getItem('einsatzzähler_aktiv_resi_base')){
        var einsatzzaehler_aktiv = false;
        localStorage.setItem("streamer_aktiv_resi_base", false);
    }else{
        einsatzzaehler_aktiv = localStorage.getItem("einsatzzähler_aktiv_resi_base")
    };
    if(!localStorage.getItem('chat_alarm_aktiv_resi_base')){
        var chat_alarm_aktiv = false;
        localStorage.setItem("chat_alarm_aktiv_resi_base", false);
    }else{
        chat_alarm_aktiv = localStorage.getItem("chat_alarm_aktiv_resi_base")
    };
    if(!localStorage.getItem('chat_alarm_audio_resi_base')){
        localStorage.setItem("chat_alarm_audio_resi_base", "test");
    };
    if(!localStorage.getItem('newCall_audio_resi_base')){
        localStorage.setItem("newCall_audio_resi_base", "test");
    };
    if(!localStorage.getItem('fms_audio_resi_base')){
        localStorage.setItem("fms_audio_resi_base", "test");
    };
    if(!localStorage.getItem('fms5_audio_resi_base')){
        localStorage.setItem("fms5_audio_resi_base", "test");
    };
    if(!localStorage.getItem('error_audio_resi_base')){
        localStorage.setItem("error_audio_resi_base", "test");
    };
    if(!localStorage.getItem('stream_text_resi_base')){
        localStorage.setItem("stream_text_resi_base", "Es handelt sich um ein Spiel mit fiktiven Einsätzen, es sind keine echten Szenarien!");
    };
    if(!localStorage.getItem('finish_audio_resi_base')){
        localStorage.setItem("finish_audio_resi_base", "test");
    };
    if(!localStorage.getItem('push_fms_aktiv_resi_base')){
        var push_fms_aktiv = false;
        localStorage.setItem("push_fms_aktiv_resi_base", false);
    }else{
        push_fms_aktiv = localStorage.getItem("push_fms_aktiv_resi_base")
    };
    if(!localStorage.getItem('zeitwechsel_aktiv_resi_base')){
        var zeitwechsel_aktiv = false;
        localStorage.setItem("zeitwechsel_aktiv_resi_base", false);
    }else{
        zeitwechsel_aktiv = localStorage.getItem("zeitwechsel_aktiv_resi_base")
    };
    if(!localStorage.getItem('uhr_aktiv_resi_base')){
        var uhr_aktiv = false;
        localStorage.setItem("uhr_aktiv_resi_base", false);
    }else{
        uhr_aktiv = localStorage.getItem("uhr_aktiv_resi_base")
    };
    if(!localStorage.getItem('uhr_min_resi_base')){
        localStorage.setItem("uhr_min_resi_base", "7");
    };
    if(!localStorage.getItem('uhr_max_resi_base')){
        localStorage.setItem("uhr_max_resi_base", "19");
    };
    if($("#darkMode").html().includes("Tag")){localStorage.setItem("darkmode_resi_base", "true");}else{localStorage.setItem("darkmode_resi_base", "false");};
    if(!localStorage.getItem('darkmode_resi_base')){
        localStorage.setItem("darkmode_resi_base", "false");
    };
    //Ende Storage-Abfrage
    //Start eigener Frame
    var listenelement = document.createElement("li");
    var vater = $("#darkMode");
    vater.after(listenelement)
    listenelement.innerHTML = "ReSi-Codebase";
    $(listenelement).on("click", () => {
        openFrame("", "1/1/4/4");
        let frame = $("#iframe");
        frame.on("load", () => {
            frame.contents().find("body").append("<script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script><link rel='stylesheet' href='css/index.css?v=0.6a' charset='utf-8'><script>if(localStorage.getItem('darkmode_resi_base')=='true'){document.getElementsByTagName('body')[0].classList.add('dark');};var speichern = function(){ gesamtmuenzen_aktiv = document.getElementById('gesamtmuenzen_check').checked;localStorage.setItem('gesamtmuenzen_aktiv_resi_base', gesamtmuenzen_aktiv); toplist_aktiv = document.getElementById('toplist_check').checked;localStorage.setItem('toplist_aktiv_resi_base', toplist_aktiv);einsatzliste_max_aktiv = document.getElementById('einsatzliste_max_check').checked;localStorage.setItem('einsatzliste_max_aktiv_resi_base', einsatzliste_max_aktiv); flogout_aktiv = document.getElementById('flogout_check').checked;localStorage.setItem('flogout_aktiv_resi_base', flogout_aktiv);autocomplete_aktiv = document.getElementById('autocomplete_check').checked;localStorage.setItem('autocomplete_aktiv_resi_base', autocomplete_aktiv);streamer_aktiv = document.getElementById('streamer_check').checked;localStorage.setItem('streamer_aktiv_resi_base', streamer_aktiv);sounds_aktiv = document.getElementById('sounds_check').checked;localStorage.setItem('sounds_aktiv_resi_base', sounds_aktiv);chat_alarm_aktiv = document.getElementById('chat_alarm_check').checked;localStorage.setItem('chat_alarm_aktiv_resi_base', chat_alarm_aktiv);einsatzzaehler_aktiv = document.getElementById('einsatzaehler_check').checked;localStorage.setItem('einsatzzähler_aktiv_resi_base', einsatzzaehler_aktiv);var sound_input_chat = $('#sound_chat_input').val();localStorage.setItem('chat_alarm_audio_resi_base', valide(sound_input_chat));var sound_input_fms = $('#sound_fms_input').val();localStorage.setItem('fms_audio_resi_base', valide(sound_input_fms));var sound_input_fms5 = $('#sound_fms5_input').val();localStorage.setItem('fms5_audio_resi_base', valide(sound_input_fms5));var sound_input_error = $('#sound_error_input').val();localStorage.setItem('error_audio_resi_base', valide(sound_input_error));var sound_input_newCall = $('#sound_newCall_input').val();localStorage.setItem('newCall_audio_resi_base', valide(sound_input_newCall));var sound_input_finish = $('#sound_finish_input').val();localStorage.setItem('finish_audio_resi_base', valide(sound_input_finish));var text_input_stream = $('#text_stream_input').val();localStorage.setItem('stream_text_resi_base', valide(text_input_stream));var uhr_min_input = $('#uhr_min_input').val();localStorage.setItem('uhr_min_resi_base', valide(uhr_min_input));console.log('test');var uhr_max_input = $('#uhr_max_input').val();localStorage.setItem('uhr_max_resi_base', valide(uhr_max_input));push_fms_aktiv = document.getElementById('push_fms_check').checked;localStorage.setItem('push_fms_aktiv_resi_base', push_fms_aktiv);zeitwechsel_aktiv = document.getElementById('zeitwechsel_check').checked;localStorage.setItem('zeitwechsel_aktiv_resi_base', zeitwechsel_aktiv);uhr_aktiv = document.getElementById('uhr_check').checked;localStorage.setItem('uhr_aktiv_resi_base', uhr_aktiv); window.top.location.reload()}; if(localStorage.getItem('toplist_aktiv_resi_base')=='true'){$('#toplist_check').attr('checked', true);}if(localStorage.getItem('gesamtmuenzen_aktiv_resi_base')=='true'){$('#gesamtmuenzen_check').attr('checked', true);}if(localStorage.getItem('flogout_aktiv_resi_base')=='true'){$('#flogout_check').attr('checked', true);}if(localStorage.getItem('einsatzliste_max_aktiv_resi_base')=='true'){$('#einsatzliste_max_check').attr('checked', true);}if(localStorage.getItem('streamer_aktiv_resi_base')=='true'){$('#streamer_check').attr('checked', true);}if(localStorage.getItem('autocomplete_aktiv_resi_base')=='true'){$('#autocomplete_check').attr('checked', true);}if(localStorage.getItem('sounds_aktiv_resi_base')=='true'){$('#sounds_check').attr('checked', true);};if(localStorage.getItem('einsatzzaehler_aktiv_resi_base')=='true'){$('#einsatzzealer_check').attr('checked', true);};if(localStorage.getItem('einsatzzähler_aktiv_resi_base')=='true'){$('#einsatzaehler_check').attr('checked', true);};if(localStorage.getItem('chat_alarm_aktiv_resi_base')=='true'){$('#chat_alarm_check').attr('checked', true);};if(localStorage.getItem('push_fms_aktiv_resi_base')=='true'){$('#push_fms_check').attr('checked', true);};if(localStorage.getItem('einsatzzähler_aktiv_resi_base')=='true'){$('#einsatzzeahler_check').attr('checked', true);};if(localStorage.getItem('zeitwechsel_aktiv_resi_base')=='true'){$('#zeitwechsel_check').attr('checked', true);};if(localStorage.getItem('uhr_aktiv_resi_base')=='true'){$('#uhr_check').attr('checked', true);};if(localStorage.getItem('sounds_aktiv_resi_base')=='true'){$('#sounds_check').attr('checked', true);};$('#uhr_min_input').val(localStorage.getItem('uhr_min_resi_base'));$('#uhr_max_input').val(localStorage.getItem('uhr_max_resi_base'));$('#sound_newCall_input').val(localStorage.getItem('newCall_audio_resi_base'));$('#sound_error_input').val(localStorage.getItem('error_audio_resi_base'));$('#sound_fms_input').val(localStorage.getItem('fms_audio_resi_base'));$('#sound_fms5_input').val(localStorage.getItem('fms5_audio_resi_base'));$('#sound_finish_input').val(localStorage.getItem('finish_audio_resi_base'));$('#text_stream_input').val(localStorage.getItem('stream_text_resi_base'));var valide = function(wert){var ausgabe='';for (var i=0; i < wert.length; i++) {if(wert[i]=='<'){ausgabe += ''}else if(wert[i]== '>'){ausgabe += ''}else{ausgabe += wert[i]};};console.log(ausgabe);return ausgabe;};</script><div class='panel'><h2 class='panel-headline'>ReSi-Codebase:</h2><h3>Einstellungen:</h3><p><h4>Module:</h4><input id='gesamtmuenzen_check' type='checkbox'> Gesamtmünzenzähler aktivieren<br><input id='toplist_check' type='checkbox'> Topliste aktivieren<br><input id='einsatzliste_max_check' type='checkbox'> Maximierte Einsatzliste aktivieren<br><input id='flogout_check' type='checkbox'> FastLogout aktivieren<br><input id='streamer_check' type='checkbox'> Eigenen Streammode-Text aktivieren<br><input id='sounds_check' type='checkbox'> Eigene Sounds aktivieren<br><input id='autocomplete_check' type='checkbox'> Autocomplet verhindern aktivieren<br><input id='einsatzaehler_check' type='checkbox'> Einsatzzähler aktivieren<br><input id='chat_alarm_check' type='checkbox'> Chat-Alarm aktivieren<br><input type='checkbox' id='push_fms_check' >  Push-FMS5 aktivieren<br><input type='checkbox' id='zeitwechsel_check' >  Wechsel in den Darkmode nach Uhrzeit aktivieren<br><input type='checkbox' id='uhr_check' >  Uhr aktivieren<br><h4>Texte & URL's:</h4><br><input id='sound_newCall_input' value='Link'> Neuer-Anruf-Sound (URL)<br><input id='sound_fms_input' value='Link'> FMS-Sound (URL)<br><input id='sound_fms5_input' value='Link'> S5-Sound (URL)<br><input id='sound_finish_input' value='Link'> Mission-fertiggestellt-Sound (URL)<br><input id='sound_error_input' value='Link'> Error-Alarm-Sound (URL)<br><input id='text_stream_input' value='Link'> Streammode-Text (TEXT)<br><input id='sound_chat_input' value='Link'> Chat-Alarm-Sound (URL)<br><input id='uhr_min_input' type='number'> Darkmode ausschalten um ... Uhr (ZAHL)<br><input id='uhr_max_input' type='number'> Darkmode anschalten um ... Uhr (ZAHL)<br><button onclick='speichern()'>Speichern</button></p><h3 class='panel-headline'>Open-Source:</h3><p><h4>Icons:</h4><br>Icons by <a href='https://fontawesome.com/' target='_blank'>Fontawesome</a> unter <a href='https://creativecommons.org/licenses/by/4.0/' target='_blank'>CC-BY 4.0-Lizenz</a>.<br><h4>JQuery:</h4><br>Copyright (c) 2021 OpenJS Foundation and other contributors, https://openjsf.org/, <br>sion is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.<br>THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><p>Danke für die Nutzung der ReSi-Codebase!</div>");
            frame.off("load");
        })
    });
    //Ende eigener Frame
    //Start function-definding
    var gesamtmuenzenanzeiger = function(){
        var neu = document.createElement("li");
        var davor = $("#darkMode");
        davor.after(neu);
        $.ajax({
            url: "/api/user",
            dataType: "json",
            type : "GET",
            success : function(r) {
                var muenzen = r.muenzenTotal.toLocaleString();
                neu.innerHTML=muenzen + " Münzen";
            }});
    };
    var einsatzliste_max = function(){
        document.getElementById("missions").style.zIndex= "50";
        document.getElementById("missions").style.gridArea= "1 / 3 / 4 / 4";
    };
    var flogout = function(){
        var platz = document.getElementsByClassName("brand-img");
        platz[0].style.display="inline";
        platz[0].style.paddingRight = "20px";
        platz[0].innerHTML='<i class="fas fa-sign-out-alt"></i>';
        platz[0].addEventListener("click", function(){ $.ajax({
            url: "/api/deauthenticate",
            type : "GET",
            success : function(r) {
                window.location.reload();
            }
        }); });
    };
    var autocomplete = function(){
        $("#chatInput").attr("autocomplete", "off");
        $("#newMissionNameInput").attr("autocomplete", "off");
        $("#newNameInput").attr("autocomplete", "off");
        $("#newMissionRoadInput").attr("autocomplete", "off");
        $("#newMissionHousenumberInput").attr("autocomplete", "off");
        $("#newMissionCityInput").attr("autocomplete", "off");
    };
    var streamerinfos = function(){
        var text = "<div class='panel-headline'>Streamer-Modus</div><p>" + localStorage.getItem("stream_text_resi_base") + "</p>";
        $("#chat").html(text);
        document.getElementById("chat").style.padding = "15px";
    };
    var toplist = function(){
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
    var custom_sounds = function(){
        var audioElement_fms = new Audio(localStorage.getItem("fms_audio_resi_base"));
        sounds.radioFMS= audioElement_fms;
        var audioElement_call = new Audio(localStorage.getItem("newCall_audio_resi_base"));
        sounds.newCall= audioElement_call;
        var audioElement_fms5 = new Audio(localStorage.getItem("fms5_audio_resi_base"));
        sounds.radioFMS= audioElement_fms5;
        var audioElement_mission = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.finishedMission= audioElement_mission;
        var audioElement_error = new Audio(localStorage.getItem("error_audio_resi_base"));
        sounds.error= audioElement_error;
    };
    var chat_alarm = function(){
        socket.on("associationMessage", (associationMessageObject) =>{
            var audio_chat = new Audio(localStorage.getItem('chat_alarm_audio_resi_base'))
            audio_chat.play();

        });
    };
    var einsatzzaehler = function(){
        var datum = new Date();
        var datum_heute = datum.getDate()
        if(!localStorage.getItem("finished_missions_nizi")){localStorage.setItem("finished_missions_nizi", "0")};
        if(!localStorage.getItem("finished_missions_nizi_time")){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
        if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi", "0")};
        if(localStorage.getItem("finished_missions_nizi_time") != datum_heute){localStorage.setItem("finished_missions_nizi_time", datum_heute)};
        var neue_liste = document.createElement("li");
        var hallo = $("#darkMode")
        neue_liste.innerHTML = "Einsätze heute: " + localStorage.getItem("finished_missions_nizi");
        hallo.after(neue_liste);
        socket.on("finishMission", (userMissionID) =>{
            var mission = localStorage.getItem("finished_missions_nizi");
            mission ++;
            localStorage.setItem("finished_missions_nizi", mission);
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
        self.addEventListener('notificationclick', function(event) {
            console.log('On notification click: ', event.notification.tag);
            event.notification.close();
        });

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
            //if(h > parseInt(localStorage.getItem("uhr_max_resi_base")) - 1 || h < parseInt(localStorage.getItem("uhr_min_resi_base")) -1){
            var min = parseInt(localStorage.getItem("uhr_min_resi_base"));
            var max = parseInt(localStorage.getItem("uhr_max_resi_base"));
            var date = new Date();
            var tag = $("#darkMode").html();
            if(min < date.getHours() && max > date.getHours() && tag.includes("Tag")){
                $("#darkMode").click();
            }else if(min > date.getHours() || max < date.getHours() && tag.includes("Nacht")){
                $("#darkMode").click();
            }
        }
        setInterval(überprüfen(), 3000);
    };
    var uhr = function(){
        var hallo = document.createElement("div");
        document.getElementsByClassName("brand")[0].after(hallo);
        var aktualisieren= function(){
            var date = new Date();
            var stunde = date.getHours();
            var minute = date.getMinutes();
            var sekunde = date.getSeconds();
            if(sekunde < 10){sekunde = "0" + sekunde};
            if(minute < 10){minute = "0" + minute};
            hallo.innerHTML = stunde + " : " + minute + " Uhr"
        };
        setInterval(aktualisieren, 50)
    };
    //Ende function-definding
    //Start ausführen
    if(toplist_aktiv == "true"){toplist();};
    if(gesamtmuenzen_aktiv == "true"){gesamtmuenzenanzeiger();};
    if(flogout_aktiv == "true"){flogout();};
    if(autocomplete_aktiv == "true"){autocomplete();};
    if(streamer_aktiv == "true"){streamerinfos()};
    if(einsatzliste_max_aktiv == "true"){einsatzliste_max();};
    if(sounds_aktiv == "true"){custom_sounds();};
    if(chat_alarm_aktiv == "true"){chat_alarm();};
    if(einsatzzaehler_aktiv == "true"){einsatzzaehler();};
    if(push_fms_aktiv == "true"){push_fms();};
    if(zeitwechsel_aktiv == "true"){zeitwechsel();};
    if(uhr_aktiv == "true"){uhr();};
    console.log("Running ReSi-Codebase in Version 1.3; Topliste: " + toplist_aktiv + " Gesamtmünzen: " + gesamtmuenzen_aktiv + " flogout: " + flogout_aktiv + " Autocomplete: " + autocomplete_aktiv + " Streamer: " + streamer_aktiv + " Einsatzliste: " + einsatzliste_max_aktiv + " Sounds: " + sounds_aktiv + " Chat-Alarm: "+ chat_alarm_aktiv + " Einsatzzähler: " + einsatzzaehler_aktiv + " Push-FMS: "+push_fms_aktiv + " Uhr: " + uhr_aktiv + " Darkmode nach Zeit: " + zeitwechsel_aktiv + "; Das Team der Codebase wünscht viel Spaß! Bei Fehlern, kopiere bitte diesen Text und füg ihn in deine Fehlermeldung ein! Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen!;")
    //Ende auführen
    //Lizenz: CC-BY-SA-NC
})();
