# README insertFields.user.js

## Darkmode
In Zeile 14 entweder `true` oder `false` hinter dem Gleichheitszeichen angeben. Alles ab `//` könnt ihr ignorieren, hierbei handelt es sich um einen Kommentar - dieser wird nciht beachtet.

## Eigene Orte / Stichwörter / ... einfügen
In den Zeilen 15-19 die entsprechenen [Arrays](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array) bestücken.

### Arrays
**Bitte unbedingt die Arrayschreibweise beibehalten und auf rote Fehlermeldungen von Tampermonkey achten**. Beispiel:
```js
['Das erste Element', 'Das zweite Element', 'Das letzte Element'];
```
Quelle: [Mozilla Developer](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array#accessing_array_elements)

### Variablen

Folgende Texte könnt ihr einfügen:
`missionNames`: Einsatzname
`missionCities`: Stadt
`missionStreets`: Straße
`missionHouseNumbers`: Hausnummer
`freeText`: Freitext

### Platzhalter

Eich stehen wie bekannt Platzhalter zur Verfügung, die ihr in einen beliebigen Text einsetzten könn und die mit dem Eert aus dem aktuellen Feld ersetzt werden.
`%stichwort%`: Einsatzstichwort
`%straße%`: Straße
`%ort%`: Ort
`%nummer%`: Hausnummer
`%name%`: Name des Anrufers
`%text%`: Freitext

## Viel Spaß!