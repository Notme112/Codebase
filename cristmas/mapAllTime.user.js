// ==UserScript==
// @name         Karte dauerhaft groß!
// @version      1.0.2
// @description  Setzt die Karte nach dem Schließen eines Frames in den Vollbildmodus!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ toggleMap */

(function() {
    const CopyOfCloseFrame = closeFrame;
    closeFrame = function(){
        CopyOfCloseFrame();
        if($("#map").hasClass("expanded")){
            toggleMap();
            toggleMap();
        }else{
            toggleMap();
        };
    }
    toggleMap();
})();
