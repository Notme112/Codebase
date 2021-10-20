// ==UserScript==
// @name         Filter KH!
// @version      1.0.0
// @description  Filtert die Krankehäuser in den Sprechwünschen!
// @author       NiZi112
// @match        https://rettungssimulator.online/vehicle/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ */

(function() {
    'use strict';

    if($('.s5').length > 0){

        console.log('sw opened');

        $('.detail-header').after(`
        <div class="card">
          <div class="card-headline card-headline-danger">
            <span class='fa fa-cogs'></span> Filter
          </div>
          <div class="card-body">
            <div class='checkbox-container' style='padding: 0px; margin:0px;'><input type='checkbox' id='ownKHCheck'><label for='ownKHCheck' style='padding-left: 0px; margin-left:0px;'>Eigene Krankenhäuser</label></div>
            <div class='checkbox-container' style='padding: 0px; margin:0px;'><input type='checkbox' id='allianceKHCheck'><label for='allianceKHCheck' style='padding-left: 0px; margin-left:0px;'>Verbandskrankenhäuser</label></div>
          </div>
        </div>
        `);

        if(!localStorage.filterKH){
            localStorage.filterKH = JSON.stringify({
                own: true,
                alliance: true
            });
        }

        var settings = JSON.parse(localStorage.filterKH);
        if(settings.own){
            document.getElementById('ownKHCheck').checked = true;
            changeKH('own', true, false)
        }else{
            changeKH('own', false, false);
        }

        if(settings.alliance){
            document.getElementById('allianceKHCheck').checked = true;
            changeKH('alliance', true, false);
        }else{
            changeKH('alliance', false, false);
        }

        function update(){
            var own;
            var alli;
            if(document.getElementById('ownKHCheck').checked){
                own = true;
            }else{
                own = false;
            }
            if(document.getElementById('allianceKHCheck').checked){
                alli = true;
            }else{
                alli = false;
            }
            localStorage.filterKH = JSON.stringify({own: own, alliance: alli});
        }

        function changeKH(kh, what, shouldUpdate){

            if(kh === 'own'){
                console.log('change own KH');
                console.log(what);
                if(what){
                    $('.fa-hospital').parent().parent().show();
                };
                if(!what){
                    $('.fa-hospital').parent().parent().hide();
                };
            }

            if(kh === 'alliance'){
                console.log('change alliance KH');
                if(!what){
                    $('.fa-hospital-user').parent().parent().hide();
                    $('.fa-hospital-user:first').parent().parent().show();
                };
                if(what){
                    $('.fa-hospital-user').parent().parent().show();
                }
            }

            if(shouldUpdate) update();
        }

        $('#ownKHCheck').on('click', function(){
            changeKH('own', document.getElementById('ownKHCheck').checked, true);
        });

        $('#allianceKHCheck').on('click', function(){
            changeKH('alliance', document.getElementById('allianceKHCheck').checked, true);
        });

    }else{

        return;

    };
})();
