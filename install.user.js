// ==UserScript==
// @name         ReSi-Codebase
// @version      1.6.0
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alle kostenlos in einem Browsergamne!
// @author       NiZi112
// @match        https://rettungssimulator.online/*
// @include      www.rettungssimulator.online
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/Notme112/Codebase/raw/main/install.user.js
// @downloadURL  https://github.com/Notme112/Codebase/raw/main/install.user.js
// @grant        none
// ==/UserScript==
/* global $ sounds openFrame socket systemMessage */
(() => {
    let script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/Notme112/Codebase/main/src/codebase.min.js';
    script.type = 'text/plain'
    document.head.appendChild(script);
})();