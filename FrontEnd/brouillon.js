async function fetchCategories () {
    const response = await fetch("http://localhost:5678/api/categories");
    if(!response.ok) {
        throw new Error("Erreur HTTP! Statut : ${response.status}")
    }
    const json = await response.json();
    console.log(json);
    return json;
}

async function displayCategories () {
    // Récupérer json
    const categories = fetchCategories();
    // console.log(categories);
}

fetchCategories();