// ==UserScript==
// @name         Forum => Wiki
// @version      1.0.0
// @description  Fügt einen Link zum Wiki im Forum hinzu!
// @author       NiZi112
// @match        https://forum.rettungssimulator.online/*
// @icon         https://www.google.com/s2/favicons?domain=forum.rettungssimulator.online
// ==/UserScript==
/* global $ */

(() => {
    'use strict';
    $(".boxMenu").append(`
    <li>
      <a class='boxMenuLink' rel='nofollow' href='https://wiki.rettungssimulator.online' target='_blank'>
        <span class='beoMenuLinkTilte'>Zum Wiki</span>
      </a>
    </li>`);
})();
