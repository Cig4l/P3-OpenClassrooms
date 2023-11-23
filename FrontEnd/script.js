//
//                              RECUPERATION DES TRAVAUX
//

async function getWorks () {
    // Fetch 
    fetch("http://localhost:5678/api/works").then(
        (works) => { return works.json() }
    // JSON conversion
    ).then(
        (json) => { return json }
    )
}

let worksList = getWorks();
console.log(worksList);

// DOM








