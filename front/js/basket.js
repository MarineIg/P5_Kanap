function addToBasket(product) {

  let selectColor = document.querySelector("#colors").value;   
  let selectQuantity = document.querySelector("#quantity").value;
  let productSelect = {
    idProduct : product._id,
    color : selectColor,
    quantity : parseInt(selectQuantity), 
  };  
  if (selectColor == null || selectColor === "" || selectQuantity == null || selectQuantity <= 0) {
    alert("Merci de sélectionner une couleur et une quantité");
  }else {    
    quantity(productSelect);   
  };
};


function quantity(productSelect) {  
  let basket = getBasket();   
  let foundProduct = basket.find(p => p.idProduct === productSelect.idProduct && p.color === productSelect.color); 
  if(foundProduct != undefined){ 
    foundProduct.quantity += productSelect.quantity;
  }else{      
    productSelect.quantity;  
    basket.push(productSelect);  
  };
  saveBasket(basket);  
};

function saveBasket(basket) { 
  localStorage.setItem("basket", JSON.stringify(basket));  
};


function getBasket(){
  let basket = localStorage.getItem("basket");
  if(basket == null){
    return [];
  }else{    
    return JSON.parse(basket);
  };
};

//// Suppression d'un produit du panier ////
function createBtnRemove(){ /// createButonRemove
  // Recupere les boutons "supprimer"
  const btnRemoves = document.querySelectorAll(".deleteItem");           
  // Parcours les boutons "supprimer" du tableau
  for(let btnRemove of btnRemoves){
    btnRemove.addEventListener("click", (e) => {       
      let basket = getBasket(); 
      const parent = e.target.closest(".cart__item");
      const id = parent.dataset.id;
      const color = parent.dataset.color;                   
      basket = basket.filter(p => p.idProduct !== id || p.color !== color); 

      parent.remove();
      saveBasket(basket);
      displayTotalQuantity();
      displayTotalPrice();     
    });
  };  
}

//// Modifie la quantité d'un produit ////
function createChangeQuantity(){
  const itemsQuantity = document.querySelectorAll(".itemQuantity") 

  for(let itemQuantity of itemsQuantity){
    itemQuantity.addEventListener("change", (e) => {
      let basket = getBasket();                 
      let parent = e.target.closest(".cart__item");
      let id = parent.dataset.id;
      let color = parent.dataset.color;

      if (parseInt(e.target.value) === 0) {
        basket = basket.filter(p => p.idProduct !== id || p.color !== color);         
        parent.remove();          
                   
        
      }else{ 
        let item = basket.find(p => p.idProduct == id && p.color == color);       
        item.quantity = parseInt(e.target.value);  
        let indexArticle = tableau.findIndex(p => p.id == item.idProduct + item.color); // recupère l'index de l'item
        tableau[indexArticle].quantity = item.quantity;   

      };

    saveBasket(basket);                               
    displayTotalQuantity();
    displayTotalPrice();

    });
  };
};

function displayTotalPrice(){  

  let totalPrice = 0; 

  for (let article of tableau){
    totalPrice += article.price * article.quantity ;   
  };

  const displayPrice = document.querySelector('#totalPrice');
  displayPrice.textContent = totalPrice;   
  
};


function displayTotalQuantity(){  

  let basket = getBasket();  
  let totalQuantity = 0;

  for (let produit of basket){
  totalQuantity += produit.quantity; 
  };

  const displayQuantity = document.querySelector('#totalQuantity');
  displayQuantity.textContent = totalQuantity;  
};


