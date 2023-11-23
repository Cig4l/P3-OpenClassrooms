//
//                              RECUPERATION DES TRAVAUX
//

// pourquoi output = Promise { undefined } ?
async function getWorks () {
    // Fetch 
    fetch("http://localhost:5678/api/works").then(
        (works) => { return works.json() }
    // JSON conversion
    ).then(
        (json) => { console.log(json) } // pourquoi return json donne undefined ?
    )
}

let worksList = getWorks();
console.log(worksList);

// DOM

function displayGallery(worksList) {
    // Sélectionner la div
    const gallery = document.querySelector(".gallery");

    // Créer les éléments
    // parent
    let galleryFigure = document.createElement("figure");
    // enfants
    let galleryImg = document.createElement("img");
    let galleryFigcaption = document.createElement("figcaption");

    // Ajouter contenu
    for(i = 0; i<worksList.length; i++){
        galleryImg.src = worksList[i].imageUrl;
        galleryImg.alt = worksList[i].title;
        galleryFigcaption.innerText = worksList[i].title;

        gallery.appendChild(galleryFigure);
        galleryFigure.append(galleryImg);
        galleryFigure.append(galleryFigcaption);
    }
}









