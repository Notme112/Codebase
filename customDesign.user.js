// ==UserScript==
// @name         Custom Design
// @version      1.0.0
// @description  Let you design the :ReSi: new, like YOU want!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         http://rettungssimulator.online/favicon.ico
// @grant        none
// ==/UserScript==
/* global $ */

(() => {
    /**
     *  1   2   3   4   5
     * 1                    -4
     *
     * 2                    -3
     * 3                    -2
     * 4                    -1
     *  -5  -4  -3  -2  -1
     * Koordinaten:
     * oben links zuerst, dann unten rechts, zuert die horizontale Zahl, dann die vertikale gentrennt durch "/", Beispiel:
     * Aktuelle Position der Karte: "1/1/3/2"
     * Keys:
     * "map": Karte,
     * "ad": Anzeige (Achtung: ausblenden stellt einen Verstoß gegen die AGB dar!),
     * "calls": Anrufe,
     * "chat": Chat,
     * "radio": Funk,
     * "buildings": Gebäude
     * Ausblenden:
     * hidden: Array, bitte nur Keys wie oben in den "" reinschreiben, diese werden ausgeblendet
     */
    let map = "1/1/3/2"; // Karte
    let ad = "3/1/3/2"; // Werbung
    let calls = "1/2/2/3"; // Anrufe
    let chat = "2/2/4/3"; // Chat, wenn expanded, dann "1/2/4/3"
    let missions = "1/3/4/4"; // Einsätze, wenn expanded, dann "1/3/4/4"
    let radio = "2/3/4/4"; // Funk
    let buildings = "1/4/4/5"; // Gebäude
    let hidden = ['radio'] // ausblenden
    $('#map').css('grid-area', map);
    $('#ad').css('grid-area', ad);
    $('#calls').css('grid-area', calls);
    $('#chat').css('grid-area', chat);
    $('#missions').css('grid-area', missions)
    $('#radio').css('grid-area', radio);
    $('#departments').css('grid-area', buildings);
    hidden.forEach((id) => {
        $('#' + id).hide();
    })
})();