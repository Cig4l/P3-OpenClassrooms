// variable pour noter quand la modale est ouverte
// quand ça reload si variable true, la modale reste affichée
// /!\ checker comportement quand quitte la page

// sécurité : rajouter des check

// handlers asynchrones

globalVar = true;

function changeValue () {
    globalVar = false;
}

changeValue();

console.log(globalVar);