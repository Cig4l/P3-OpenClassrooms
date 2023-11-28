// const LOGIN = {
//     "email": "sophie.bluel@test.tld",
//     "password": "S0phie"
// }

// const LOGIN_JSON = JSON.stringify(LOGIN);

const WRONG_ID = document.getElementById("wrong-id");

async function postLogin () {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: LOGIN_JSON
    });
    if(!response.ok) {
        throw new Error("Wrong ID or password")
    }
    const json = await response.json();
    return json;
}

async function login () {
    // Récupération de l'userId + token
    const login = await postLogin();

    const admin = {
        "userId": await login.userId,
        "token": await login.token
    }

    if(admin.token !== undefined){
        console.log(admin);
        return admin;
    }
    else{
        console.log("red");
    }
}

console.log(login());

// SE CONNECTER

let emailLogin = document.getElementById("email-login");
let valueEmailLogin = emailLogin.value;

let mdpLogin = document.getElementById("mdp-login");
let valueMdpLogin = mdpLogin.value;

let connexionButton = document.getElementById("connexion-button");

connexionButton.addEventListener("click", function (event) {
    // Annule le comportement par défaut du bouton de connexion
    event.preventDefault();
    
    const LOGIN = {
        "email": emailLogin.value,
        "password": mdpLogin.value
    }
    
    const LOGIN_JSON = JSON.stringify(LOGIN);
    console.log(LOGIN_JSON);

    login()
})