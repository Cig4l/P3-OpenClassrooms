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

let admin = {
    "userId": null,
    "token": null
}

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

    admin = {
        "userId": await login.userId,
        "token": await login.token
    }
    console.log(admin);

    if(admin.token !== null){
        localStorage.setItem('admin', JSON.stringify(admin));
        window.location.href = "index.html";
    }
}

//                          EVENT POUR SE CONNECTER

connexionButton.addEventListener("click", function (event) {
    // Annule le comportement par défaut de connexionBouton
    event.preventDefault();

    WRONG_ID.innerText = "";        // Réinitialiser variable
    admin = {                       // Réinitialiser objet
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