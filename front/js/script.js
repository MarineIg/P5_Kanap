// Requete de l'API qui renvoie les différents produits
fetch("http://localhost:3000/api/products")
  .then((data) => {
    if (data.ok) {
      return data.json();
    }
  })

  .then((jsonListProduct) => {
    for (let jsonProduct of jsonListProduct) {
      const product = jsonProduct;
      // Affichage de l'ensemble des produits sur la page
      document.getElementById("items").innerHTML += ` <a href="./product.html?_id=${product._id}">
                                                        <article>
                                                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                          <h3 class="productName">${product.name}</h3>
                                                          <p class="productDescription">${product.description}</p>
                                                        </article>
                                                      </a>`;
    };
  })

  .catch((err) => {
    console.log("erreur :", err);    
  });
