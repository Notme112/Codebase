// ==UserScript==
// @name         Shortlinks
// @version      1.0.0
// @description  Macht Sachen!
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==

(function() {
    'use strict';
    $('#ad').append(`
        <div class="button-split">
            <a target="_blank" href="https://forum.rettungssimulator.online/" class="no-prevent button button-round button-success button-w100"><center>Forum</center></a>
            <a target="_blank" href="https://wiki.rettungssimulator.online/" class="no-prevent button button-round button-success button-w100"><center>Wiki</center></a>
            <a target="_blank" href="https://rettungssimulator.online/faq" class="no-prevent button button-round button-success button-w100"><center>FAQ</center></a>
        </div>`)
})();
