// ==UserScript==
// @name         ColorAndHighlightAAO
// @version      1.0.0
// @description  ---
// @author       NiZi112
// @match        ://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
(function () {
    let aaoIdsToHighlight = [1, 2];
    let colorsForAaos = {
        'blue': [0],
        'red': [1]
    }
    aaoIdsToHighlight.forEach((id) => {
        let aao = document.querySelector(`.mission-aao[aaoid="${id}"]`);
        if(aao) {
            aao.querySelector('.mission-aao-name').style.fontWeight = "1000";
        }
    });
    for(let color in colorsForAaos){
        colorsForAaos[color].forEach((id) => {
            let aao = document.querySelector(`.mission-aao[aaoid="${id}"]`);
            if(aao) {
                aao.querySelector('.mission-aao-name').style.color = color;
            }
        })
    }
})()