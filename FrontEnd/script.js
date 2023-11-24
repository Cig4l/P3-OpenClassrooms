//
//                              RECUPERATION DES TRAVAUX
//

async function fetchWorks () {
    const response = await fetch("http://localhost:5678/api/works");
    if(!response.ok) {
        throw new Error("Erreur HTTP! Statut : ${response.status}")
    }
    const json = await response.json();
        return json;
}

async function displayGallery () {
    // Récupérer JSON
    const worksList = await fetchWorks();
    console.log(worksList)

    // Sélectionner la div
    const gallery = document.querySelector(".gallery");

    // Ajouter contenu
    for(i = 0; i<worksList.length; i++){
        // Créer les éléments
            // parent
        let galleryFigure = document.createElement("figure");
            // enfants
        let galleryImg = document.createElement("img");
        let galleryFigcaption = document.createElement("figcaption");

        galleryImg.src = worksList[i].imageUrl;
        galleryImg.alt = worksList[i].title;
        galleryFigcaption.innerText = worksList[i].title;

        gallery.appendChild(galleryFigure);
        galleryFigure.appendChild(galleryImg);
        galleryFigure.appendChild(galleryFigcaption);
    }
}

// Appel lors du lancement initial de la page
displayGallery();

// // Rafraîchit la gallerie quand la page est actualisée
// window.addEventListener("load", function(){
//     // vider la div pour éviter doublon ?
//     displayGallery();
// })










