let panier = getBasket();
let storePrices = [];
displayTotalPrice();
displayTotalQuantity();

for (let listProduct of panier) {
    const produit = listProduct;
    
    //Requête l'API qui renvoie les produits du panier
    fetch(`http://localhost:3000/api/products/${produit.idProduct}`)

        .then((data) => {
          if (data.ok) {
            return data.json();
          }
        })

        .then((jsonListProduct) => {
            const product = jsonListProduct;      
            // Affichage des produits du panier
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

            // Création d'un nouvel ID afin de stocker le prix et la quantité
            const id = produit.idProduct + produit.color;
            const article = new Article(id, product.price, produit.quantity);                     
            storePrices.push(article);           
            
            displayTotalPrice();          
            createBtnRemove();          
            createChangeQuantity();
        }) 

        .catch((err) => {
          console.log("erreur", err);
        });
        
        displayTotalQuantity();  
        
}; 


//////////////////////////////////// Formulaire ////////////////////////////////////////

let validator = new Validator();

// Récupère les inputs du formulaire
let inputFirstName = document.querySelector(".cart__order__form__question:nth-child(1) input");
let inputLastName = document.querySelector(".cart__order__form__question:nth-child(2) input");
let inputAddress = document.querySelector(".cart__order__form__question:nth-child(3) input");
let inputCity = document.querySelector(".cart__order__form__question:nth-child(4) input");
let inputEmail = document.querySelector(".cart__order__form__question:nth-child(5) input");

// Récupère les id des messages d'erreur
let firstNameError = document.querySelector("#firstNameErrorMsg");
let lastNameError = document.querySelector("#lastNameErrorMsg");
let addressError = document.querySelector("#addressErrorMsg");
let cityError = document.querySelector("#cityErrorMsg");
let emailError = document.querySelector("#emailErrorMsg");

let btnSubmit =  document.querySelector("#order");

let products = [];

inputFirstName.addEventListener('focusout', () => { 
  let firstName = inputFirstName.value;  
  verifFirstName(firstName); 
});

inputLastName.addEventListener('focusout', () => { 
  let lastName = inputLastName.value;  
  verifLastName(lastName); 
});

inputAddress.addEventListener('focusout', () => { 
  let address = inputAddress.value;  
  verifAddress(address); 
});

inputCity.addEventListener('focusout', () => { 
  let city = inputCity.value;  
  verifCity(city); 
});

inputEmail.addEventListener('focusout', () => { 
  let email = inputEmail.value;  
  verifEmail(email); 
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  btnSubmitVerif();
});
  
  




