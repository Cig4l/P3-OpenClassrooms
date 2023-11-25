//
//                              RECUPERATION DES TRAVAUX
//

async function fetchCategories () {
    const response = await fetch("http://localhost:5678/api/categories");
    if(!response.ok) {
        throw new Error("Erreur HTTP! Statut : ${response.status}")
    }
    const json = await response.json();
    return json;
}

async function displayCategories () {
    // Récupérer json
    const categories = await fetchCategories();
    console.log(categories);

    // Sélectionner la div
    const filters = document.querySelector(".filters");

    // Ajouter contenu
    for(i=0; i<categories.length; i++){
        // Créer bouton API
        let filter = document.createElement("button");
        // Propriétés
        filter.classList.add("filter");
        filter.id = `filter-${categories[i].id}`;
        filter.textContent = `${categories[i].name}`;
        // Ajouter bouton
        filters.appendChild(filter);
    }
}

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
    // console.log(worksList)

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
// displayGallery();

// // Rafraîchit la gallerie quand la page est actualisée
window.addEventListener("load", function(){
    displayCategories();
    displayGallery();
})










