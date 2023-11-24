// pourquoi output = Promise { undefined } ?



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
        galleryFigure.appendChild(galleryImg);
        galleryFigure.appendChild(galleryFigcaption);
    }
}

// Appel lors du lancement initial de la page
displayGallery(worksList);

// Rafraîchit la gallerie quand la page est actualisée
window.addEventListener("load", function(){
    displayGallery(worksList);
})