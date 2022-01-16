// ==UserScript==
// @name         Hide Vehicle
// @version      1.1.0
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
        const el = document.getElementsByClassName('mission-vehicle')
        const km = document.getElementsByClassName('vehicle-distance')
        for(var i = 0; i < el.length; i++){
            var e = el[i];
            if(parseFloat(km[i].innerText) > dis){
                //verstecken
                e.classList.remove('vehicle');
                e.style.display = 'none';
            }else{
                //zeigen
                if(!e.classList.contains('vehicle')){
                    e.classList.add('vehicle');
                    e.style.display = '';
                };
            };
        }
        updateAAOButtons()
    };
    function saveSettings(){
        var n = parseFloat($('#vehicleDistance').val());
        localStorage.distaceVehicle = n;
        applyFilter(n);
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
