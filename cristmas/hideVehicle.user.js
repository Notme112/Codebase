// ==UserScript==
// @name         Hide Vehicle
// @version      1.0
// @description  Filter die Fahrzeuge im Einsatzfenster nach Entfernung
// @author       NiZi112
// @match        *://rettungssimulator.online/mission/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// @grant        none
// ==/UserScript==
/* global $ updateAAOButtons */

(function() {
    'use strict';
    localStorage.distaceVehicle ? '' : localStorage.distaceVehicle = 10;
    var d = parseFloat(localStorage.distaceVehicle);
    function applyFilter(dis){
        for(var i = 0; i < $('.mission-vehicle').length; i++){
            if(parseFloat($('.vehicle-distance').eq(i).text()) > dis){
                //verstecken
                $('.mission-vehicle').eq(i).removeClass('vehicle').hide();
            }else{
                //zeigen
                if(!$('.mission-vehicle').eq(i).hasClass('vehicle')){
                    $('.mission-vehicle').eq(i).addClass('vehicle').show();
                };
            };
            updateAAOButtons()
        }
    };
    function saveSettings(){
        var n = parseFloat($('#vehicleDistance').val());
        localStorage.distaceVehicle = n;
        d = n;
        applyFilter(d);
    }
    $('.onscene:first').after(`<div class="card">
    <div class="card-headline card-headline-danger">
    Fahrzeugdistanz
    </div>
    <div class="card-body">
      <div class="input-container" data-tooltip="Klicke irgendwo außerhalb des Containers um zu speichern.">
        <div class="input-label">Maximale Fahrzeugdistanz</div>
        <div class="input-content">
          <input class="input-round" type="text" value="${d}" id="vehicleDistance" placeholder="Maximale Distanz..." autocomplete="off">
          <div class="input-icon"><i class="fas fa-filter"></i></div>
        </div>
      </div>
    </div>
    </div>`);
    $('#vehicleDistance').on('change', saveSettings);
    applyFilter(d);
})();
