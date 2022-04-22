// Requete API
fetch("http://localhost:3000/api/products")
  .then(function (data) {
    if (data.ok) {
      return data.json();
    }
  })
  .then(function (jsonListProduct) {
    for (let jsonProduct of jsonListProduct) { //boucle qui va parcourir la tableau json et va créer dans variable jsonProduct
      const product = jsonProduct;
      document.getElementById("items").innerHTML += ` <a href="./product.html?_id=${product._id}">
                                                        <article>
                                                          <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                          <h3 class="productName">${product.name}</h3>
                                                          <p class="productDescription">${product.description}</p>
                                                        </article>
                                                      </a>`;
    };
  })
  .catch(function (err) {
    console.log("erreur :", err);
  });
