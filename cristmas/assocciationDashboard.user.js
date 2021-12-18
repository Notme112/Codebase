// ==UserScript==
// @name         AssociationDashboard
// @version      1.0.0
// @description  Shows a Dashboard with data to your Association!
// @author       NiZi112
// @match        *://rettungssimulator.online/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==
/* global $ */

async function fetchAPI(type, id){
    var str = `?`;
    if(id) str = `?id=${id}`;
    await $.getJSON(`api/${type}`).done((result) => sessionStorage.setItem(`API${type}`, JSON.stringify({lastUpdate:(new Date).getTime(), data: result})));
};
if(!sessionStorage.APIassociation || JSON.parse(sessionStorage.APIassociation).lastUpdate < (new Date).getTime() - 300000){
    fetchAPI('association');
}
try{
    if($('#darkMode').html().includes('Tag'))
        localStorage.setItem('darkmode_resi_base', 'true');
    else localStorage.setItem('darkmode_resi_base', 'false');
} catch {
    console.error('Darkmode-Button nicht gefunden');
};

$('#darkMode').on('click', () => {
    if (localStorage.getItem('darkmode_resi_base') == 'true')
        localStorage.setItem('darkmode_resi_base', 'false');
    else localStorage.setItem('darkmode_resi_base', 'true');
});

const buildingTypes = {
    4: 'Krankenhaus'
}
const roles = {
    1: 'Admin',
    2: 'Co-Admin',
    3: 'Schuldirektor',
    4: 'Mitglied'
}
const apidata = JSON.parse(sessionStorage.APIassociation).data;
$('#darkMode').after(`<li id="associationDashboard">Verbandsdashboard</li>`);
var text = `<div class='panel-body'>
            <script src='https://rettungssimulator.online/js/jquery-3.5.0.min.js'></script>
            <link rel='stylesheet' href='css/index.css?v=0.6a' charset='utf-8'>
            <script src='https://rettungssimulator.online/js/index.js?v=0.7.1a'></script>
            <script src='https://rettungssimulator.online/js/iframe.js?new=true&v=0.6.1e'></script>
            <script src='https://rettungssimulator.online/js/controlCenter.js?v=0.6.1e'></script>
            <script src="https://rettungssimulator.online/js/popper.js?v=0.7l" charset="utf-8"></script>
            <script src='https://rettungssimulator.online/js/tippy.js?v=0.6.1e'></script>
            <script>
            if(localStorage.getItem('darkmode_resi_base') == 'true') $('body').addClass('dark')
            </script>
            <div class='detail-header'>
            <div class='detail-title'>ReSi-Codebase <div class='right' onclick='window.parent.closeFrame()'> X </div></div>
            <div class='detail-subtitle'>Schau dir hier Verbands-Statistiken an!</div></div>`;
text += `<h2>Team</h2>`;
text += `<table class="striped table-divider">
           <thead>
             <th>Name</th>
             <th>Position</th>
             <th>Onlinestatus</th>
           </thead>
         <tbody>`;
var user = `<table class="striped table-divider">
           <thead>
             <th>Name</th>
             <th>Onlinestatus</th>
           </thead>
         <tbody>`;
var adminOnline = 0;
var coadminOnline = 0;
var schooldirektorOnline = 0;
var onlineUser = 0;
apidata.associationUsers.forEach((obj) => {
    if(obj.associationRoleID != 4){
        text += `<tr><td>${obj.userName}</td><td>${roles[obj.associationRoleID]}</td><td>${obj.isOnline ? '<span class="label label-success">Online</span>' : '<span class="label label-danger">Offline</span>'}</td></tr>`
        if(obj.isOnline){
            switch(obj.associationRoleID){
                case 1:
                    adminOnline++;
                    break;
                case 2:
                    coadminOnline++;
                    break;
                case 3:
                    schooldirektorOnline++;
                    break;
            }
        }
    };
    user += `<tr><td>${obj.userName}</td><td>${obj.isOnline ? '<span class="label label-success">Online</span>' : '<span class="label label-danger">Offline</span>'}</td></tr>`;
    if(obj.isOnline) onlineUser++
})
text += `</tbody></table>`;
user += `</tbody></table>`;
text += `<h2>Status</h2>
         Verbandsname: ${apidata.associationName}<br>
         Admin's online: ${adminOnline}<br>
         Co-Admin's online: ${coadminOnline}<br>
         Schuldirektoren online: ${schooldirektorOnline}<br>
         Mitglieder online: ${onlineUser}<br>
         Mitglieder gesamt: ${apidata.associationUsers.length}<br>
         Geteilte Gebäude: ${apidata.associationSharedBuildings.length}<br>
         ID: ${apidata.associationID}<br>
         Münzen (gesamt verdient): ${apidata.associationMuenzenTotal}<br>
         Münzen (aktull in der Kasse): ${apidata.associationMuenzenBank}
         `
text += `<h2>Mitglieder</h2>
${user}`;
text += `<h2>Verbandsgebäude</h2>`;
var b = `<table class="striped table-divider">
           <thead>
             <th>Typ</th>
             <th>Name</th>
             <th>Adresse</th>
           </thead>
         <tbody>`;
apidata.associationSharedBuildings.forEach(obj => {
    b += `<tr><td>${buildingTypes[obj.buildingType]}</td><td>${obj.userBuildingName}</td><td>${obj.address}</td></tr>`
})
b += `</tbody></table>
      <i>Werte aktualisieren sich bei neuladen mit Strg + F5 oder Strg + Umschalt + R</i>`
text += b;
text += `</div>`;
$('#associationDashboard').on('click', () => {
    openFrame('', '1/1/4/5');
    const frame = $('#iframe');
    frame.on('load', () => {
        frame.contents().find('body').append(text);
        frame.off('load');
    });
});
