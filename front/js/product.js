// Récupération de l'id produit dans l'url
let productId = new URL(location.href).searchParams.get("_id");

//Requête de l'API pour le produit selectionné
fetch(`http://localhost:3000/api/products/${productId}`)

  .then((data) => {
    if (data.ok) {
      return data.json();
    }
  })

  .then((jsonListProduct) => {
    const product = jsonListProduct;
    // Affichage du produit selectionné
    document.querySelector(".item").innerHTML = ` <article>
                                                    <div class="item__img">
                                                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                                                    </div>

                                                    <div class="item__content">
                                                      <div class="item__content__titlePrice">
                                                        <h1 id="title">${product.name}</h1>
                                                        <p>Prix : <span id="price">${product.price}</span>€</p>
                                                      </div>

                                                      <div class="item__content__description">
                                                        <p class="item__content__description__title">Description :</p>
                                                        <p id="description">${product.description}</p>
                                                      </div>

                                                      <div class="item__content__settings">

                                                        <div class="item__content__settings__color">
                                                          <label for="color-select">Choisir une couleur :</label>
                                                          <select name="color-select" id="colors">
                                                              <option value="">--SVP, choisissez une couleur --</option>                                                                
                                                          </select>
                                                        </div>

                                                        <div class="item__content__settings__quantity">
                                                          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                                                          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                                                        </div>

                                                      </div> 

                                                      <div class="item__content__addButton">
                                                        <button id="addToCart">Ajouter au panier</button>
                                                      </div>

                                                    </div>        
                                                  </article>`;     

    for (let colorSelect of product.colors) {
      document.querySelector("#colors").innerHTML += `<option value="${colorSelect}">${colorSelect}</option>`;    
    };

    // Création du bouton "ajouter au panier"
    const btnAdd = document.getElementById("addToCart");   

    btnAdd.addEventListener("click", () => {
      addToBasket(product);     
    });
  })

  .catch((err) => {
    console.log("erreur", err);
  });




