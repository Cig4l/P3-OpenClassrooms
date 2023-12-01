let LOGIN = {
    "email": "",
    "password": ""
    }

let LOGIN_JSON = "";

LOGIN = {
    "email": "@",
    "password": "pw"
    }

LOGIN_JSON = JSON.stringify(LOGIN);

console.log(LOGIN);

console.log(LOGIN_JSON);