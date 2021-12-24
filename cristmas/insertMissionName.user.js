/// ==UserScript==
// @name         Stichwörter einfügen!
// @version      1.2.0
// @description  Fügt Stichwörter auf Klick in das jeweilige Feld ein!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    'use strict';
    const worte = ["1.1", "1.2"];
    const worte2 = ["2.1", "2.2"];

    var html_string = "<span style='overflow: auto;'>"
    for (var i = 0; i < worte.length; i++) {
        html_string += `<span onclick='$("#iframe").contents().find("#newMissionNameInput").val(this.innerHTML)' style="width:49%;float:left;overflow:auto;">${worte[i]}</span>`;
        html_string += `<span onclick='$("#iframe").contents().find("#newMissionNameInput").val(this.innerHTML)' style="width:49%;float:left;overflow:auto;">${worte2[i]}</span><br>`;
    };

    html_string += "</span>"
    $("#ad").append(html_string);
})();
