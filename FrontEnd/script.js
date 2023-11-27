//
//                              RECUPERATION DES TRAVAUX
//
const CATEGORIES_API = "http://localhost:5678/api/categories";
const WORKS_API = "http://localhost:5678/api/works";

// let current_filter

async function fetchFromAPI (url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Erreur HTTP! Statut : ${response.status}")
    }
    const json = await response.json();
    return json;
}

async function displayCategories () {
    // Récupérer json
    const categories = await fetchFromAPI(CATEGORIES_API);
    console.log(categories);

    // Sélectionner la div
    const filters = document.querySelector(".filters");
    // Children
    let children = filters.children;

    // Bouton Tous
    let filterZero = document.getElementById("filter-0");
    // Event Bouton Tous
    filterZero.addEventListener("click", function () {
        // selectFilter(this);
        for(i=0; i<children.length; i++){
            // Remove selected class
            children[i].classList.remove("selectedFilter");
        }
        filterZero.classList.add("selectedFilter");
        displayGallery();
    });

    // Boutons Filtres de l'API
    for(i=0; i<categories.length; i++){
        // Créer bouton API
        let filter = document.createElement("button");
        let id = categories[i].id;
        // Propriétés
        filter.classList.add("filter");
        filter.type = "button";
        filter.id = `filter-${categories[i].id}`;
        filter.textContent = `${categories[i].name}`;
        // Ajouter bouton
        filters.appendChild(filter);
        // Event qui gère le style des boutons filtre
        // (puis affiche la galerie)
        filter.addEventListener("click", function () {
            for(i=0; i<children.length; i++){
                children[i].classList.remove("selectedFilter");
            }
            filter.classList.add("selectedFilter");
            // displayGallery()
            // MODIF
            if(filter.id === "filter-0"){
                displayGallery("0");
            }
            else{
                displayGallery(id);
            }
            // FIN MODIF
        })
    }
}


                          // MODIF

async function displayGallery (id) {
    // Récupérer JSON
    const worksList = await fetchFromAPI(WORKS_API);
    // console.log(worksList)

    // Sélectionner la div
    const gallery = document.querySelector(".gallery");
    // Réinitialiser contenu div
    gallery.innerHTML = "";

    // Ajouter contenu
    let filter = document.querySelectorAll(".filter");

    if(filter[0].className === "selectedFilter"){
        console.log("hello");
    }

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

// // Rafraîchit la gallerie quand la page est actualisée
window.addEventListener("load", function(){
    displayCategories();
})

