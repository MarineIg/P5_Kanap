let panier = JSON.parse(localStorage.getItem("basket"));
// let totalPrice = 0;
let tableau = [];
// let key = "";



for (let listProduct of panier) {
    const produit = listProduct;

    fetch(`http://localhost:3000/api/products/${produit.idProduct}`)

        .then(function (data) {
          if (data.ok) {
            return data.json();
          }
        })
        .then(function (jsonListProduct) {
            const product = jsonListProduct;      
          
            document.getElementById("cart__items").innerHTML += ` <article class="cart__item" data-id="${produit.idProduct}" data-color="${produit.color}">
                                                                    <div class="cart__item__img">
                                                                      <img src="${product.imageUrl}" alt="${product.altTxt}"></img>
                                                                    </div>
                                                                    <div class="cart__item__content">
                                                                      <div class="cart__item__content__description">
                                                                        <h2>${product.name}</h2>
                                                                        <p>${produit.color}</p>
                                                                        <p>${product.price} €</p>
                                                                      </div>
                                                                      <div class="cart__item__content__settings">
                                                                        <div class="cart__item__content__settings__quantity">
                                                                          <p>Qté : </p>
                                                                          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produit.quantity}">
                                                                        </div>
                                                                        <div class="cart__item__content__settings__delete">
                                                                          <p class="deleteItem">Supprimer</p>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </article>`;
            
            const id = produit.idProduct + produit.color;
            const article = new Article(id, product.price, produit.quantity)
            // tableau[key] = {price : product.price, quantity : produit.quantity};            
            tableau.push(article);           

            // console.log(tableau[key].price);
            // console.log(tableau);      
            
            
            //// Affichage prix total //// 
            displayTotalPrice();
            
            //// Suppression d'un produit du panier ////
            createBtnRemove();            
            
            //// Modifie la quantité d'un produit ////
            createChangeQuantity();
        }) 
        .catch(function (err) {
          console.log("erreur", err);
        });

        //// Affichage nombre produit total ////
        displayTotalQuantity();    
        
        
}; 

displayTotalPrice();
displayTotalQuantity(); 