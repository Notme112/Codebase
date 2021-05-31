// ==UserScript==
// @name         ReSi-Codebase
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Erwitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @include      www.rettungssimulator.online
// @include      www.rettungssimulator.online/toplist
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
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
        var autocomplete_akiv = false;
        localStorage.setItem("autocomplete_aktiv_resi_base", false);
    }else{
        var autocomplete_aktiv = localStorage.getItem("autocomplete_aktiv_resi_base");
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
    //Ende Storage-Abfrage
    //Start speichern
    var speichern = function(){
        gesamtmuenzen_aktiv = document.getElementById("gesamzmuenzen_check").checked;
        localStorage.setItem("gesamtmuenzen_aktiv_resi_base", gesamtmuenzen_aktiv);
        toplist_aktiv = document.getElementById("toplist_check").checked;
        localStorage.setItem("toplist_aktiv_resi_base", toplist_aktiv);
        einsatzliste_max_aktiv = document.getElementById("einsatzliste_max_check").checked;
        localStorage.setItem("einsatzliste_max_aktiv_resi_base", einsatzliste_max_aktiv);
        flogout_aktiv = document.getElementById("flogout_check").checked;
        localStorage.setItem("flogout_aktiv_resi_base", flogout_aktiv);
        autocomplete_aktiv = document.getElementById("autocomplete_check").checked;
        localStorage.setItem("autocomplete_aktiv_resi_base", autocomplete_aktiv);
        streamer_aktiv = document.getElementById("streamer_check").checked;
        localStorage.setItem("streamer_aktiv_resi_base", streamer_aktiv);
        sounds_aktiv = document.getElementById("sounds_check").checked;
        localStorage.setItem("sounds_aktiv_resi_base", sounds_aktiv);
        window.location.reload();
    };
    //Ende speichern
    //Start eigener Frame
    var listenelement = document.createElement("li");
    var vater = $("#darkMode");
    vater.after(listenelement)
    listenelement.innerHTML = "ReSi-Codebase";
    $(listenelement).on("click", () => {
        openFrame("", "1/1/4/4");
        let frame = $("#iframe");
        frame.on("load", () => {
            frame.contents().find("body").append("<script>var speichern = function(){ gesamtmuenzen_aktiv = document.getElementById('gesamtmuenzen_check').checked;localStorage.setItem('gesamtmuenzen_aktiv_resi_base', gesamtmuenzen_aktiv); toplist_aktiv = document.getElementById('toplist_check').checked;localStorage.setItem('toplist_aktiv_resi_base', toplist_aktiv);einsatzliste_max_aktiv = document.getElementById('einsatzliste_max_check').checked;localStorage.setItem('einsatzliste_max_aktiv_resi_base', einsatzliste_max_aktiv); flogout_aktiv = document.getElementById('flogout_check').checked;localStorage.setItem('flogout_aktiv_resi_base', flogout_aktiv);autocomplete_aktiv = document.getElementById('autocomplete_check').checked;localStorage.setItem('autocomplete_aktiv_resi_base', autocomplete_aktiv);streamer_aktiv = document.getElementById('streamer_check').checked;localStorage.setItem('streamer_aktiv_resi_base', streamer_aktiv);sounds_aktiv = document.getElementById('sounds_check').checked;localStorage.setItem('sounds_aktiv_resi_base', sounds_aktiv); window.top.location.reload()};</script><div class='panel' style='color:white;'><h3 class='panel-headline'>ReSi-Codebase</h3><p><input id='gesamtmuenzen_check' type='checkbox'> Gesamtmümzenzähler aktivieren<br><input id='toplist_check' type='checkbox'> Topliste aktivieren<br><input id='einsatzliste_max_check' type='checkbox'> Maximierte Einsatzliste aktivieren<br><input id='flogout_check' type='checkbox'> FastLogout aktivieren<br><input id='streamer_check' type='checkbox'> Eigenen Streammode-Text aktivieren<br><input id='sounds_check' type='checkbox'> Eigene Sounds aktivieren<br><input id='autocomplete_check' type='checkbox'> Autocomplet verhindern aktivieren<br><button onclick='speichern()'>Speichern</button></p></div>");
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
        var twitter = "Twitter: @rettungssim";
        var youtube = "Youtube: TutePlays";
        var facebook = "Facebook: facebook.com/rettungssimulator"
        var insta = "Instagram: instagram.com/rettungssimulator"
        var text = "Es handelt sich um ein Spiel mit fiktiven Einsätzen, es sind keine echten Szenarien!"
        text = "<div class='panel-headline'>Streamer-Modus</div><p>Es handelt sich um ein Spiel mit fiktiven Einsätzen, es sind keine echten Szenarien!<br><hr style='width:100%;'><br>" + twitter + "<br>" + youtube + "<br>" + facebook + "<br>" + insta + "</p>"
        $("#chat").html(text);
        document.getElementById("chat").style.padding = "15px";
    };
    var toplist = function(){
        if(window.location.href.includes("toplist")){
            var platz = parseInt($("h3 a").html().replace("Dein Rang: ", ""));
            var storage = localStorage;
            localStorage.setItem('platzierung_toplist_nizi', platz);
        };
        if(!localStorage.getItem("platzierung_toplist_nizi")){
            window.location.href = "toplist";
        };
        platz = localStorage.getItem("platzierung_toplist_nizi");
        $("#darkMode").after("<li>Topliste: " + platz + "</li>");
    };
    var custom_sounds = function(){
        var audioElement_fms = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.radioFMS= audioElement_fms;
        var audioElement_call = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.newCall= audioElement_call;
        var audioElement_fms5 = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.radioFMS= audioElement_fms5;
        var audioElement_mission = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.finishedMission= audioElement_mission;
        var audioElement_error = new Audio("https://rettungssimulator.online/sounds/newCall.mp3");
        sounds.error= audioElement_error;}
    //Ende function-definding
    //Start ausführen
    if(toplist_aktiv == "true"){toplist();};
    if(gesamtmuenzen_aktiv == "true"){gesamtmuenzenanzeiger();};
    if(flogout_aktiv == "true"){flogout();};
    if(autocomplete_aktiv == "true"){autocomplete();};
    if(streamer_aktiv == "true"){streamerinfos()};
    if(einsatzliste_max_aktiv == "true"){einsatzliste_max();};
    if(sounds_aktiv == "true"){custom_sounds();};
    console.log("Running ReSi-Codebase in Version 1.0; " + "Topliste: " + toplist_aktiv + " Gesamtnmünzen: " + gesamtmuenzen_aktiv + " flogout: " + flogout_aktiv + " Autocomplete: " + autocomplete_aktiv + " Streamer: " + streamer_aktiv + " Einsatzliste: " + einsatzliste_max_aktiv + " Sounds: " + sounds_aktiv + "; Das Team der Codebase wünscht viel Spaß! Bei Fehlern, kopiere bitte diesen Text und füg ihn in deine Fehlermeldung ein! Der Text enthält wichtige Informationenn zu deinen verwendeten Modulen!;")
    //Ende auführen
    })();
