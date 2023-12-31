// sophie.bluel@test.tld
// S0phie

//                                   DOM

let emailLogin = document.getElementById("email-login");
let mdpLogin = document.getElementById("mdp-login");

let connexionButton = document.getElementById("connexion-button");

const WRONG_ID = document.querySelector(".wrong-id");

//                     Objets stockant les infos de login

let LOGIN = {
    "email": "",
    "password": ""
}

let LOGIN_JSON = "";

let ADMIN = {
    "userId": null,
    "token": null
}

let is_connecting = false;

//                            FONCTION FETCH POST LOGIN

async function postLogin () {
    console.log()
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: LOGIN_JSON
    });
    if(!response.ok) {
        WRONG_ID.innerText = "Identifiant et/ou mot de passe incorrects";
        throw new Error("Identifiant et/ou mot de passe incorrects")
    }
    const json = await response.json();
    return json;
}

//                                FONCTION POUR LOGIN

async function login () {
    // Récupération de l'userId + token
    const login = await postLogin();

    ADMIN = {
        "userId": await login.userId,
        "token": await login.token
    }
    console.log(ADMIN);

    if(ADMIN.token !== null){
        localStorage.setItem('ADMIN', JSON.stringify(ADMIN));
        is_connecting = true;
        localStorage.setItem('is_connecting', JSON.stringify(is_connecting));
        window.location.href = "index.html";                    // redirection
    }
}

//                          EVENT POUR SE CONNECTER

connexionButton.addEventListener("click", function (event) {
    // Annule le comportement par défaut de connexionBouton
    event.preventDefault();

    WRONG_ID.innerText = "";        // Réinitialiser variable
    ADMIN = {                       // Réinitialiser objet
        "userId": null,
        "token": null
    } 

    LOGIN = {
    "email": emailLogin.value,
    "password": mdpLogin.value
    }

    LOGIN_JSON = JSON.stringify(LOGIN);
    console.log(LOGIN_JSON);

    login();
})