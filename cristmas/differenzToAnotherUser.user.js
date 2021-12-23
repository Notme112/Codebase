// ==UserScript==
// @name         DifferenzToAnOtherUser
// @version      1.0.0
// @description  Show the differenz to an ohter user in the profile of this user!
// @author       NiZi112
// @match        https://rettungssimulator.online/profile/*
// @icon         https://www.google.com/s2/favicons?domain=rettungssimulator.online
// ==/UserScript==
/* global $ */

(function() {
    'use strict';
     $.getJSON('/api/user/').done((res) => {
         var diff = parseInt($('.detail-subtitle b').eq(2).text().replaceAll('.', '')) - res.muenzenTotal,
             negative;
         diff < 0 ? negative = true : negative = false;
         diff = Math.abs(diff)
         $('.detail-subtitle').eq(1).after(`<i class="fas fa-arrows-alt-v"></i> Differenz: <b>${diff.toLocaleString()}</b> Münzen ${negative ? 'weniger als Du' : 'mehr als Du'}`)
    })
})();
