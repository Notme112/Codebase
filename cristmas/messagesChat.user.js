// ==UserScript==
// @name         MessagesChat
// @version      1.0.0
// @description  Sendet automatisiert eine Nachricht bei Trigger in den Chat
// @author       NiZi112
// @match        https://rettungssimulator.online/
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
/* global $ noticeModal */

(function() {
    'use strict';
    const worte = ['Nachricht eins', 'Nachricht zwei', 'Nachricht 3'];
    let html = '<div>';
    for(var i = 0; i < worte.length; i++){
        html += `<input type='radio' class='sendStatus' val='${worte[i]}' name='statusCheck' id='check_${i}'><label for='check_${i}' class='labelChatSend'>${worte[i]}</label><br>`;
    };
    html += '<button class="button button-round button-success" id="sendMessageStatus">Status senden</button></div>';
    $('#ad').append(html);
    $('#sendMessageStatus').on('click', function(){
        if($('.sendStatus.active').length != 1){
            noticeModal('Fehler', 'Du musst einen Status auswählen! Wenn ein Status ausgewählt ist, wähle ihn bitte nochmal aus!', 'Schließen');
            return;
        };
        var für = $(".sendStatus.active").attr("id");
        try {
            var query = document.querySelectorAll(`.labelChatSend[for='${CSS.escape(für)}']`)[0];
        } catch(e){
            noticeModal('Fehler', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
        };
        if(worte.indexOf(query.innerText) == -1 || !query.innerText){
            noticeModal('Fehler2', 'Bitte lade die Seite neu! Wenn der Fehler weiter auftritt, wende dich an NiZi112!', 'Schließen');
        }
        $.ajax({
            url: "/api/sendAssociationChatMessage",
            dataType: "json",
            type : "POST",
            data: {
                "message": query.innerText,
            },
            success : function(r) {
            }
        });
        $('.sendStatus.active').removeClass('active');
    });
    $('.sendStatus').on('click', function(e){
        $('.sendStatus.active').removeClass('active');
        $(e.target).addClass('active');
    });
})();
