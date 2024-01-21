let html = document.documentElement;
let filterZero = document.getElementById("filter-0");
// 
//                                  DOM CONNEXION
//
let ADMIN = JSON.parse(localStorage.getItem('admin'));
let is_connecting = JSON.parse(localStorage.getItem('is_connecting'));
let loginLi = document.getElementById("login-li");
let loginLink = document.getElementById("login-link");
//
//                                  DOM ADMIN
//
const ADMIN_HEADER = document.querySelector(".admin-header");
const MODIFIER_BUTTON = document.querySelector(".modifier-button");
let editIcon = document.querySelector(".edit-icon");
let modifierText = document.querySelector(".modifier-button p");
//
//
//                                 DOM MODALE
//
//
// let backgroundGray = document.querySelector(".background-gray");
let backgroundGray = document.querySelector(".modale-background");
// Icônes
let xmarkIconOne = document.querySelector("#modal-1 .xmark-icon");
let xmarkIconTwo = document.querySelector("#modal-2 .xmark-icon");
let arrowLeftIcon = document.querySelector(".arrow-left-icon");  
// PAGE 1
let modalOne = document.getElementById("modal-1");      
const THUMBNAILS_CONTAINER = document.getElementById("th-container"); 
// PAGE 2
let modalTwo = document.getElementById("modal-2");      
const NEXT_MODAL_BUTTON = document.getElementById("next-modal-button");
let modalSubmitButton = document.getElementById("modal-submit-button");
let fileInput = document.getElementById("fileInput");
let form = document.getElementById("img-form");
let imgFile = undefined;
let submitMessage = document.getElementById("submit-message");
let ajouterContainer = document.getElementById("ajouter-container");
let ajouterInterface = document.getElementById("ajouter-interface");
let displayImage = document.getElementById("display-image");
//
//                              RECUPERATION DES TRAVAUX
//
const CATEGORIES_API = "http://localhost:5678/api/categories";
const WORKS_API = "http://localhost:5678/api/works";
const DELETE_API = "http://localhost:5678/api/works/"
//
//
//
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
async function displayCategories () {
    const categories = await fetchFromAPI(CATEGORIES_API);
    console.log(categories);
    
    const filters = document.querySelector(".filters");
    let children = filters.children;
    
    filterZero.addEventListener("click", function () {      // bouton "Tous"
        for(i=0; i<children.length; i++){
            // Remove selected class
            children[i].classList.remove("selectedFilter");
        }
        filterZero.classList.add("selectedFilter");
        displayGallery(0);
    });
    
    for(i=0; i<categories.length; i++){                 // autres boutons
        let filter = document.createElement("button");
        let id = categories[i].id;
        filter.classList.add("filter");
        filter.type = "button";
        filter.id = `filter-${categories[i].id}`;
        filter.textContent = `${categories[i].name}`;
        filters.appendChild(filter);

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
    let worksList = await fetchFromAPI(WORKS_API);
    // console.log(worksList)
    
    if(id !== 0) {
        worksList = worksList.filter(work => work.categoryId === id);
    }
    
    const gallery = document.querySelector(".gallery");
    gallery.textContent = "";
    // let filter = document.querySelectorAll(".filter");
    
    for(j = 0; j<worksList.length; j++){
        let galleryFigure = document.createElement("figure");
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
//                    AFFICHER MINIATURES DE LA MODALE
//
async function displayThumbnails(){
    let worksList = await fetchFromAPI(WORKS_API);
    
    THUMBNAILS_CONTAINER.textContent = "";
    trashcanList = [];
    
    for(i=0; i<worksList.length; i++){
        let ApiId = await worksList[i].id;
        // Figure
        let thumbnailsFigure = document.createElement("figure");
        thumbnailsFigure.classList.add("thumbnails-figure");
        thumbnailsFigure.id = `th-figure-${worksList[i].id}`;
        THUMBNAILS_CONTAINER.appendChild(thumbnailsFigure);
        // Img
        let thumbnailsImg = document.createElement("img");
        thumbnailsImg.classList.add("thumbnails-img");
        thumbnailsImg.id = `th-img-${worksList[i].id}`;
        thumbnailsImg.src = worksList[i].imageUrl;
        thumbnailsImg.alt = worksList[i].title;
        thumbnailsFigure.appendChild(thumbnailsImg);
        // Trash can button
        let trashcanButton = document.createElement("button");
        trashcanButton.classList.add("trashcan");
        trashcanButton.type = "submit";
        trashcanButton.id = `trashcan-${worksList[i].id}`;
        thumbnailsFigure.appendChild(trashcanButton);
        // Trash can icon
        let trashcanIcon = document.createElement("i");
        trashcanIcon.classList.add("fa-solid", "fa-trash-can", "trash-can-styling");
        trashcanIcon.style.color = "white";
        trashcanIcon.id = `tc-icon-${worksList[i].id}`;
        trashcanButton.appendChild(trashcanIcon);
        // Remove work
        let trashCanIconId = document.getElementById(trashcanIcon.id);
        trashCanIconId.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("HTML ID :" + trashcanIcon.id);
            console.log("API ID :" + ApiId);
            deleteWork(ApiId);
        })
    }
}
//
//                            SUPPRIMER DES TRAVAUX
//
async function deleteWork(workId){
    const stringId = await workId.toString();    
    const url = DELETE_API + stringId;
    const token = ADMIN.token;

    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Accept': '*/*',
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    if (response.status === 200) {
        console.log(`La suppression du travail avec l'ID ${stringId} a réussi.`);
        displayThumbnails();
        displayGallery(0);
    }
    else if(response.status === 204){
        displayThumbnails();
        displayGallery(0);
        console.log(`La suppression du travail avec l'ID ${stringId} a réussi.`);
    }
    else if(response.status === 401){
        throw new Error(`Vous n'êtes pas autorisée à supprimer un item.`);
    } 
    else{
        console.log(`Comportement inattendu. Code : ${response.status}`);
    }
}
//
//                              AJOUTER DES TRAVAUX
//
//
function deleteInputValues(){
    imgFile = "undefined";
    form.reset();
    document.getElementById("ajouter-subtitle").textContent = "jpg, png : 4mo max";
    ajouterContainer.style.padding = "19px";
    displayImage.style.display = "none";
    ajouterInterface.style.display = "flex";
    submitMessage.textContent = "";
}
//
function displayAddWorksInterface(){
    ajouterInterface.style.display = "flex";
    displayImage.style.display = "none";
}
//
// Afficher l'image sélectionnée
fileInput.addEventListener("change", function(event){
    displayImage.style.display = "flex";
    //
    let imgInput = event.target;
    imgFile = imgInput.files[0];
    console.log(imgFile);
    if(imgFile){
        while (displayImage.firstChild) {
            displayImage.removeChild(displayImage.firstChild);
        }
        let imgElement = document.createElement("img");
        ajouterContainer.style.padding = "0";
        imgElement.className = "img-element";
        imgElement.src = URL.createObjectURL(imgFile);
        ajouterInterface.style.display = "none";
        displayImage.appendChild(imgElement);
    }
})
//
async function displayFormOptions(){
    const categories = await fetchFromAPI(CATEGORIES_API);

    categorieSelect = document.getElementById("categorie");

    if(categorieSelect.firstChild){            
        for(i=0; categorieSelect.length; i++){
            categorieSelect.removeChild(categorieSelect.firstChild);
        }
    }

    for(i=0; i<categories.length; i++){
        option = document.createElement("option");
        option.textContent = categories[i].name;
        option.value = categories[i].id;
        categorieSelect.appendChild(option)
    }
}
//
modalSubmitButton.addEventListener("click", function(event){
    event.preventDefault();
    
    let titre = document.getElementById("titre");
    let categorie = document.getElementById("categorie"); 

        let formData = new FormData();

        if(imgFile){
            formData.append("image",imgFile)
        }                         
        formData.append("title", titre.value);                      
        formData.append("category", parseInt(categorie.value));     
    
        sendWork(formData);
})
//
// API REQUEST
//
async function sendWork (formData) {
    const response = await fetch (WORKS_API, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${ADMIN.token}`,
        },
        body: formData  
    })
    if(!response.ok) {
        submitMessage.textContent = "Erreur lors de la soumission de l'oeuvre";
        submitMessage.style.color = "#c41f1f";
        throw new Error("Erreur lors de la soumission de l'oeuvre")
    }
    else{
        submitMessage.textContent = "Soumission réussie !"
        submitMessage.style.color = "green";
        ajouterContainer.style.padding = "19px";
        ajouterInterface.style.display = "flex";
        displayImage.style.display = "none";
        imgFile = "undefined";
        form.reset();
        displayGallery(0)
    }
}

function clickOnFilterZero(){
    if(filterZero.style.display !== "none"){
        filterZero.classList.add("selectedFilter");
        displayGallery(0);
    }
}

//
window.addEventListener("load", function(event){
    ADMIN = JSON.parse(localStorage.getItem('ADMIN'));
    is_connecting = JSON.parse(localStorage.getItem('is_connecting'));

    
    if (window.performance && window.performance.getEntriesByType) {
        var navigationEntries = window.performance.getEntriesByType('navigation');
        console.log(window.location.href);
        clickOnFilterZero();   
        if (navigationEntries.length > 0) {
            var navigationType = navigationEntries[0].type;
            // redirection vers la page d'accueil quand on login
            if(navigationType !== 'reload' && is_connecting === true) {
                console.log("connexion et redirection vers la page d'accueil");
                is_connecting = false;
                localStorage.setItem('is_connecting', JSON.stringify(is_connecting));
                is_connecting = JSON.parse(localStorage.getItem('is_connecting'));
            }
            else if(navigationType === 'reload') {      
                console.log('La page a été actualisée');
                console.log(`is_connecting : ${is_connecting}`);
                is_connecting = false;
                localStorage.setItem('is_connecting', JSON.stringify(is_connecting));
            } 
            else {                                         
                console.log('La page a été chargée pour la 1e fois');
                if (ADMIN !== null){
                    localStorage.removeItem("ADMIN");
                    ADMIN.userId = null;
                    ADMIN.token = null;
                }
            }
        }
    }
    event.preventDefault();
    //
    if (ADMIN !== null){                    // AFFICHAGE : USER OU ADMIN                  
        if (ADMIN.token !== null){             
            loginLi.innerText = "logout";      
            ADMIN_HEADER.style.display = "flex";
            MODIFIER_BUTTON.style.display = "flex";
            filterZero.style.display = "none"; 
            console.log(ADMIN.token);
            displayGallery(0);
        }
        else{                              
            displayCategories();
        }
    }
    else{                                   
        displayCategories();
    }
})
//
//
//                                 DECONNEXION
//
//
loginLink.addEventListener("click", function () {
    if(loginLi.innerText === "logout"){
        localStorage.clear();
    }
})
//
//
//                               OUVRIR / FERMER MODALE
//
//
MODIFIER_BUTTON.addEventListener("mouseover", function(){
    editIcon.style.color = "#B1663C";
    modifierText.style.color = "#B1663C";
})

MODIFIER_BUTTON.addEventListener("mouseout", function(){
    editIcon.style.color = "black";
    modifierText.style.color = "black";
})

MODIFIER_BUTTON.addEventListener("click", function(){
    let html = document.documentElement;
    backgroundGray.style.display = "block";
    modalTwo.style.display = "none";
    modalOne.style.display = "block";
    displayThumbnails();
    deleteInputValues();
})

xmarkIconOne.addEventListener("click", function(){
    backgroundGray.style.display = "none";
    modalOne.style.display = "none";
    displayAddWorksInterface();
    deleteInputValues();
})
    
xmarkIconTwo.addEventListener("click", function(){
    backgroundGray.style.display = "none";
    modalTwo.style.display = "none";
    displayAddWorksInterface();
    deleteInputValues();
})
    
backgroundGray.addEventListener("click", function(event){       // clics en dehors de modale 
    let isClickInsideModalOne = modalOne.contains(event.target);
    let isClickInsideModalTwo = modalTwo.contains(event.target);

    if(!isClickInsideModalOne && !isClickInsideModalTwo){
        modalOne.style.display = "none";
        modalTwo.style.display = "none";
        backgroundGray.style.display = "none";
        displayAddWorksInterface();
        deleteInputValues();
    }
})
//
NEXT_MODAL_BUTTON.addEventListener("click", function(){
    modalOne.style.display = "none";
    modalTwo.style.display = "block";
    displayFormOptions();
})
//
arrowLeftIcon.addEventListener("click", function(){
    modalTwo.style.display = "none";
    modalOne.style.display = "block";
    displayThumbnails();
})

