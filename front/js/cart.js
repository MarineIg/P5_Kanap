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

//////////////////////////////////// Formulaire ////////////////////////////////////////

let validator = new Validator();

let inputFirstName = document.querySelector(".cart__order__form__question:nth-child(1) input");
let inputLastName = document.querySelector(".cart__order__form__question:nth-child(2) input");
let inputAddress = document.querySelector(".cart__order__form__question:nth-child(3) input");
let inputCity = document.querySelector(".cart__order__form__question:nth-child(4) input");
let inputEmail = document.querySelector(".cart__order__form__question:nth-child(5) input");

let firstNameError = document.querySelector("#firstNameErrorMsg");
let lastNameError = document.querySelector("#lastNameErrorMsg");
let addressError = document.querySelector("#addressErrorMsg");
let cityError = document.querySelector("#cityErrorMsg");
let emailError = document.querySelector("#emailErrorMsg");

let btnSubmit =  document.querySelector("#order");



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


function verifFirstName (firstName){
  
  if (!validator.isName(firstName)) {
    
    firstNameError.style.display = "inline";
    firstNameError.textContent = "Format incorrect";
    return false; 
    
  }else{
    
    firstNameError.style.display = "none";
    return true;
  };
};


function verifLastName (lastName){
  
  if (!validator.isName(lastName)) {
    
    lastNameError.style.display = "inline";
    lastNameError.textContent = "Format incorrect"; 
    return false;    

  }else{
    
    lastNameError.style.display = "none";
    return true;
  }
}

function verifAddress (address){
  
  if (!validator.isAddress(address)) {
    
    addressError.style.display = "inline";
    addressError.textContent = "Format incorrect"; 
    return false;
  
  }else{
    
    addressError.style.display = "none";
    return true;
  }
}

function verifCity (city){
  
  if (!validator.isName(city)) {
   
    cityError.style.display = "inline";
    cityError.textContent = "Format incorrect"; 
    return false;
    
  }else{
    
    cityError.style.display = "none";
    return true;
  }
}

function verifEmail (email){
  
  if (!validator.isEmail(email)) {
    
    emailError.style.display = "inline";
    emailError.textContent = "Format incorrect";
    return false; 
    
  }else{
    
    emailError.style.display = "none";
    return true;
  }
}

btnSubmit.addEventListener('click', function(e){
  
  e.preventDefault();
  btnSubmitVerif();

})

function btnSubmitVerif(){

  let formIsValid = true;
  
  let firstName = inputFirstName.value; 
  let lastName = inputLastName.value; 
  let address = inputAddress.value;  
  let city = inputCity.value;
  let email = inputEmail.value;  

  if (!verifFirstName(firstName)) {
    formIsValid = false;  
    firstNameError.textContent = "Champ obligatoire";  
  }
  if (!verifLastName(lastName)) {
    formIsValid = false; 
    lastNameError.textContent = "Champ obligatoire";   
  }
  if (!verifAddress(address)) {
    formIsValid = false; 
    addressError.textContent = "Champ obligatoire";    
  }
  if (!verifCity(city)) {
    formIsValid = false; 
    cityError.textContent = "Champ obligatoire";    
  }
  if (!verifEmail(email)) {
    formIsValid = false; 
    emailError.textContent = "Champ obligatoire";    
  }

  if(formIsValid){
    alert('Formulaire envoyé')    
  } 
}

