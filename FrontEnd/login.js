// sophie.bluel@test.tld
// S0phie

let emailLogin = document.getElementById("email-login");
let mdpLogin = document.getElementById("mdp-login");
let connexionButton = document.getElementById("connexion-button");
const WRONG_ID = document.querySelector(".wrong-id");

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

async function login () {
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
        window.location.href = "index.html";                    
    }
}

connexionButton.addEventListener("click", function (event) {
    event.preventDefault();

    WRONG_ID.innerText = "";        
    ADMIN = {                       
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