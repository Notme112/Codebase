// ==UserScript==
// @name         Filter SW#2!
// @version      1.0.0
// @description  Filtert die Krankehäusewr bei den SW nach eigenen Kriterien.!
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
        <div class='card'>
          <div class='card-headline card-headline-danger'>
          <span class='fa fa-cogs'></span>&nbsp;Krankenhäuser filtern:
          </div>
          <div class='card-body'>
            <div class='checkbox-container' style='padding: 0px; margin:0px;'><input type='checkbox' id='ownKHCheck'><label for='ownKHCheck' style='padding-left: 0px; margin-left:0px;'>Eigene Krankenhäuser</label></div>
            <div class='checkbox-container' style='padding: 0px; margin:0px;'><input type='checkbox' id='allianceKHCheck'><label for='allianceKHCheck' style='padding-left: 0px; margin-left:0px;'>Verbandskrankenhäuser</label></div>
            <div class='input-container'><div class='input-label' style='padding:0px; margin:0px;'>Entfernung maximal:</div><input type='number' class='input-round' style='padding:0px; margin:0px;' autocomplete='off' id='distanceKHInput' value='10'></div>
          </div>
        </div>
        `);

        if(!localStorage.filterKH){
            localStorage.filterKH = JSON.stringify({
                own: true,
                alliance: true,
                km: 10
            });
        }

        var settings = JSON.parse(localStorage.filterKH);

        $('#distanceKHInput').val(settings.km);

        if(settings.own){
            document.getElementById('ownKHCheck').checked = true;
        }

        if(!settings.own){
            $('#ownKHCheck').attr('checked', false);
        }

        if(settings.alliance){
            document.getElementById('allianceKHCheck').checked = true;
        }

        if(!settings.alliance){
            document.getElementById('allianceKHCheck').checked = false;
        }

        changeKH(false);

        function update(){
            var own = document.getElementById('ownKHCheck').checked;
            var alli = document.getElementById('allianceKHCheck').checked;
            var km = parseInt($('#distanceKHInput').val());

            localStorage.filterKH = JSON.stringify({
                own: own,
                alliance: alli,
                km: km
            });
            console.log('update')
        }

        function changeKH(update1){

            for(var i = 1; i < $('.pointer').length; i++){
                var val = parseInt($('#distanceKHInput').val());
                var own = document.getElementById('ownKHCheck').checked;
                var alli = document.getElementById('allianceKHCheck').checked;
                var j = 1+(i*2)-1;
                var entf = parseInt($('.box-text').eq(j).text().replace(' km', ''));
                if(entf < val){
                    console.log('entferneung kleiner val');
                    if($('.box-progress').eq(i).html().includes('<span class="label label-info label-round text-small">VERBAND</span>')){
                        if(alli){
                            console.log('gefunden & gelassen');
                            $('.box-progress').eq(i).show();
                        }else{
                            console.log('ausgeblendet')
                            $('.box-progress').eq(i).hide();
                        }
                    }else if(own){
                        console.log('eigen gefunden & gelassen')
                        $('.box-progress').eq(i).show();
                    }else{
                        console.log('ausgeblendet')
                        $('.box-progress').eq(i).hide();
                    };
                }else{
                    $('.box-progress').eq(i).hide();
                }
            }

            if(update1){
                update();
                console.log('up')
            }
        }

        $('#ownKHCheck').on('click', function(){
            changeKH(true);
        });

        $('#allianceKHCheck').on('click', function(){
            changeKH(true);
        });

        $('#distanceKHInput').on('change', function(){
            changeKH(true);
        });

        $('#distanceKHInput').on('keydown', function(){
            changeKH(true);
        })
    }else{
        return;
    };
})();
