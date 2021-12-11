// ==UserScript==
// @name         Notes
// @version      1.0.0
// @description  Fügt dem Spiel eine Notizfunktion hinzu!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global openFrame $ */

(function() {
    'use strict';
    if(!localStorage.notesNiZi) localStorage.notesNiZi = "Notizen";
    if($("#darkMode").html().includes("Tag")){localStorage.setItem("darkmode_resi_base", "true");}else{localStorage.setItem("darkmode_resi_base", "false");};
    var btn = $("darkMode");
    $(btn).on("click", function() {if(localStorage.getItem("darkmode_resi_base") == "true"){localStorage.setItem("darkmode_resi_base", "false");}else{localStorage.setItem("darkmode_resi_base", "true");};});
    $(btn).after('<li id="notes_nizi">Notizen</li>')
    $("#notes_nizi").on("click", () => {
        openFrame("", "1/1/4/4");
        let frame = $("#iframe");
        frame.on("load", () => {
            frame.contents().find("body").append(`<script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script>
            <script src="https://rettungssimulator.online/js/frame.js?v=0.6.1e" charset="utf-8"></script><script>
            if(localStorage.getItem('darkmode_resi_base')=='true'){document.getElementsByTagName('body')[0].classList.add('dark');};
            </script>
            <link rel='stylesheet' href='css/index.css?v=0.6a' charset='utf-8'>
            <div class='detail-header'>
            <div class='detail-title'>Notizen</div>
            <div class='detail-subtitle'>Deine eigenen Notizen</div>
            </div>
            <textarea class='input-round' rows='10' autocomplete='off' id='notes_nizi_resi'>${localStorage.notesNiZi}</textarea>
            <button class='button button-round button-success' onclick='localStorage.notesNiZi = $("#notes_nizi_resi").val(); parent.closeFrame()'>Speichern</button>`);
            frame.off("load");
        })
    });
})();
