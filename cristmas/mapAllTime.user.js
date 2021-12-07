// ==UserScript==
// @name         Karte dauerhaft groß!
// @version      1.0.0
// @description  Lässt die Karte dauerhaft im Vollbild!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    const CopyOfCloseFrame = closeFrame;
    closeFrame = function(){
        CopyOfCloseFrame();
        if(!$("#map").hasClass("expanded")){
            toggleMap();
        };
    }
})();
