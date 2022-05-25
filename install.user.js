// ==UserScript==
// @name         ReSi-Codebase
// @version      1.7.0
// @description  Erweitert viele Funktionen und fügt neue hinzu. Das alles kostenlos in einem Browsergame!
// @author       NiZi112
// @match        https://rettungssimulator.online/*
// @include      www.rettungssimulator.online
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateURL    https://github.com/Notme112/Codebase/raw/main/install.user.js
// @downloadURL  https://github.com/Notme112/Codebase/raw/main/install.user.js
// @supportURL   https://github.com/Notme112/Codebase/issues/new/choose
// @homepage     https://github.com/Notme112/Codebase/
// @run-at       document-idle
// @grant        none
// ==/UserScript==
(() => {
    let script = document.createElement('script');
    script.src = `https://cdn.jsdelivr.net/gh/Notme112/Codebase@main/src/codebase.min.js?scriptVersion=${GM_info.script.version}&gameVersion=${ReSi.resiVersion}`;
    document.body.appendChild(script);
})();