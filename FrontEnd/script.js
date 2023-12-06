//
//                                  DOM CONNEXION
//
const ADMIN = JSON.parse(localStorage.getItem('admin'));

let loginLi = document.getElementById("login-li");
let loginLink = document.getElementById("login-link");
//
//                                  DOM ADMIN
//
const ADMIN_HEADER = document.querySelector(".admin-header");
const MODIFIER_BUTTON = document.querySelector(".modifier-button");
let editIcon = document.querySelector(".edit-icon");
const modifierText = document.querySelector(".modifier-button p");
//
//                                 DOM MODALE
//
let backgroundGray = document.querySelector(".background-gray");
let modalOne = document.getElementById("modal-1");      // page 1 de la modale
let modalTwo = document.getElementById("modal-2");      // page 2 de la modale 
let xmarkIconOne = document.querySelector("#modal-1 .xmark-icon");
let xmarkIconTwo = document.querySelector("#modal-2 .xmark-icon");
const NEXT_MODAL_PAGE = document.getElementById("next-modal-page");
let arrowLeftIcon = document.querySelector(".arrow-left-icon");  
//
//                              RECUPERATION DES TRAVAUX
//
const CATEGORIES_API = "http://localhost:5678/api/categories";
const WORKS_API = "http://localhost:5678/api/works";

async function fetchFromAPI (url) {
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Echec pendant la récupération des travaux")
    }
    const json = await response.json();
    return json;
}
//
//                               AFFICHER CATEGORIES 
//
const filterZero = document.getElementById("filter-0");

async function displayCategories () {
    // Récupérer json
    const categories = await fetchFromAPI(CATEGORIES_API);
    console.log(categories);

    // Sélectionner la div
    const filters = document.querySelector(".filters");
    // Children
    let children = filters.children;

    // BOUTON TOUS
    // Event Bouton Tous
    filterZero.addEventListener("click", function () {
        // selectFilter(this);
        for(i=0; i<children.length; i++){
            // Remove selected class
            children[i].classList.remove("selectedFilter");
        }
        filterZero.classList.add("selectedFilter");
        displayGallery(0);
    });

    // AUTRES BOUTONS
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
            displayGallery(id);
        })
    }
}
//
//                           AFFICHER GALLERIE + FILTRER
//
async function displayGallery (id) {
    // Récupérer JSON
    let worksList = await fetchFromAPI(WORKS_API);
    // console.log(worksList)

    // Filtrage si l'id n'est pas 0 (bouton filtre Tous)
    if(id !== 0) {
        worksList = worksList.filter(work => work.categoryId === id);
    }

    // Sélectionner la div
    const gallery = document.querySelector(".gallery");
    // Réinitialiser contenu div
    gallery.innerHTML = "";

    // Ajouter contenu
    let filter = document.querySelectorAll(".filter");

    for(j = 0; j<worksList.length; j++){
        // Créer les éléments
            // parent
        let galleryFigure = document.createElement("figure");
            // enfants
        let galleryImg = document.createElement("img");
        let galleryFigcaption = document.createElement("figcaption");

        galleryImg.src = worksList[j].imageUrl;
        galleryImg.alt = worksList[j].title;
        galleryFigcaption.innerText = worksList[j].title;

        gallery.appendChild(galleryFigure);
        galleryFigure.appendChild(galleryImg);
        galleryFigure.appendChild(galleryFigcaption);
    }
}
//
// Rafraîchit la gallerie quand la page est actualisée
//
window.addEventListener("load", function(){
    // displayGallery(0);
    // Lien pour logout
    if (ADMIN === null){        // si pas connecté
        displayCategories();
    }
    else{                      // si connecté
        loginLi.innerText = "logout";      //lien de déconnexion
        ADMIN_HEADER.style.display = "flex";
        MODIFIER_BUTTON.style.display = "flex";
        filterZero.style.display = "none"; // fait disparaître bouton-filtre "Tous"
        console.log(ADMIN.token);
        displayGallery(0);
    } 
})
//
//
//                                 DECONNEXION
//
//
loginLink.addEventListener("click", function () {
    if(loginLi.innerText === "logout"){
        // console.log("clear LocalStorage");
        localStorage.clear();
    }
})
//
//
//                               INTERFACE ADMIN
//
//
// Hover sur le bouton "modifier" de l'interface admin
MODIFIER_BUTTON.addEventListener("mouseover", function(){
    editIcon.style.color = "#B1663C";
    modifierText.style.color = "#B1663C";
})

MODIFIER_BUTTON.addEventListener("mouseout", function(){
    editIcon.style.color = "black";
    modifierText.style.color = "black";
})
//
// Apparition de la modal quand on clique sur MODIFIER_BUTTON
MODIFIER_BUTTON.addEventListener("click", function(){
    backgroundGray.style.display = "block";
    modalTwo.style.display = "none";
    modalOne.style.display = "block";
})
//
// Fermeture de la modale
xmarkIconOne.addEventListener("click", function(){
    backgroundGray.style.display = "none";
    modalOne.style.display = "none";
})

xmarkIconTwo.addEventListener("click", function(){
    backgroundGray.style.display = "none";
    modalOne.style.display = "none";
})
//
// Aller à la page suivante de la modale
NEXT_MODAL_PAGE.addEventListener("click", function(){
    modalOne.style.display = "none";
    modalTwo.style.display = "block";
})
//
//  Retourner à la page précédente de la modale
arrowLeftIcon.addEventListener("click", function(){
    modalTwo.style.display = "none";
    modalOne.style.display = "block";
})
