//
//                              RECUPERATION DES TRAVAUX
//

let listeTravaux;

// envoi de requête GET
 listeTravaux = fetch("http://localhost:5678/api/works")
    // then => requête traitée en asynchrone
    // .json : convertit requête en JSON
    .then(response => response.json())
    .then(data => {
        // Pending Promise
        listeTravaux = data;
        // console.log(data);
    })
    .catch(error => {
        console.error(error);
    });


