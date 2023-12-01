// const LOGIN = {
//     "email": "sophie.bluel@test.tld",
//     "password": "S0phie"
// }

// Document Object Model

let emailLogin = document.getElementById("email-login");
let valueEmailLogin = emailLogin.value;

let mdpLogin = document.getElementById("mdp-login");
let valueMdpLogin = mdpLogin.value;

let connexionButton = document.getElementById("connexion-button");

const WRONG_ID = document.querySelector(".wrong-id");

// Variables stockant les infos de login

let LOGIN = {
    "email": "",
    "password": ""
    }

let LOGIN_JSON = "";

let admin = {
    "userId": undefined,
    "token": undefined
}

// FONCTION FETCH POST LOGIN

async function postLogin () {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: LOGIN_JSON
    });
    if(!response.ok) {
        WRONG_ID.innerText = "Oups";
        // throw new Error("Wrong ID or password")
    }
    const json = await response.json();
    return json;
}

// FONCTION POUR LOGIN

async function login () {
    // Récupération de l'userId + token
    const login = await postLogin();
    console.log(login);

    admin = {
        "userId": await login.userId,
        "token": await login.token
    }
    console.log(admin);

    if(admin.token !== undefined){
        return admin;
    }
    
}

// EVENT POUR SE CONNECTER

connexionButton.addEventListener("click", function (event) {
    // Annule le comportement par défaut du bouton de connexion
    event.preventDefault();

    // Réinitialiser variables
    WRONG_ID.innerText = "";
    admin = {
        "userId": undefined,
        "token": undefined
    }

    LOGIN = {
    "email": emailLogin.value,
    "password": mdpLogin.value
    }

    LOGIN_JSON = JSON.stringify(LOGIN);
    console.log(LOGIN_JSON);

    login();
})