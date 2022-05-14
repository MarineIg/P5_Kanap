// Ajout du produit au panier
const addToBasket = (product) => {

  let selectColor = document.querySelector("#colors").value;   
  let selectQuantity = document.querySelector("#quantity").value;
  let productSelect = {
    idProduct : product._id,
    color : selectColor,
    quantity : parseInt(selectQuantity), 
  };  
  if (selectColor == "" || selectQuantity == null || selectQuantity <= 0) {    
    return false;
  }else {    
    alert('Produit(s) ajouté(s) au panier')
    quantity(productSelect);   
  };

};

// Permet de choisir la quantité du produit selectionné
const quantity = (productSelect) => {  

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

// Permet d'enregistrer le panier dans le localStorage
const saveBasket = (basket) => { 

  localStorage.setItem("basket", JSON.stringify(basket));

};

// Permet de récupérer le panier du localStorage
const getBasket = () =>{

  let basket = localStorage.getItem("basket");
  if(basket == null){
    return [];
  }else{    
    return JSON.parse(basket);
  };

};

// Créer les boutons supprimer et supprime le produit selectionné au click
const createBtnRemove = () => { 
  
  const btnRemoves = document.querySelectorAll(".deleteItem");           
  
  for(let btnRemove of btnRemoves){
    btnRemove.addEventListener("click", (e) => {       
      let basket = getBasket(); 
      const parent = e.target.closest(".cart__item");
      const id = parent.dataset.id;
      const color = parent.dataset.color;   
      let item = basket.find(p => p.idProduct == id && p.color == color); 
     
      basket = basket.filter(p => p.idProduct !== id || p.color !== color); 
      storePrices = storePrices.filter(p => p.id !== item.idProduct + item.color);
      
      parent.remove();      
      saveBasket(basket);
      displayTotalQuantity();
      displayTotalPrice();     
    });
  };

};

// Permet de modifier la quantité d'un produit
const createChangeQuantity = () => {

  const itemsQuantity = document.querySelectorAll(".itemQuantity");

  for(let itemQuantity of itemsQuantity){

    itemQuantity.addEventListener("change", (e) => {
      let basket = getBasket();                 
      let parent = e.target.closest(".cart__item");
      let id = parent.dataset.id;
      let color = parent.dataset.color;  

      let item = basket.find(p => p.idProduct == id && p.color == color);      

      item.quantity = parseInt(e.target.value); 

      let indexArticle = storePrices.findIndex(p => p.id == item.idProduct + item.color);       

      // recupère l'index de l'item
      storePrices[indexArticle].quantity = item.quantity;            

      // Va supprimer le produit si 0 ou différent d'une quantité
      if(storePrices[indexArticle].quantity <= 0 || !storePrices[indexArticle].quantity){        
              
        basket = basket.filter(p => p.idProduct !== id || p.color !== color);
        storePrices = storePrices.filter(p => p.id !== item.idProduct + item.color);
        parent.remove();          
      };

      saveBasket(basket);                               
      displayTotalQuantity();
      displayTotalPrice();

    });
  };
};

// Permet d'afficher le prix total
const displayTotalPrice = () => { 
  
  // let basket = getBasket();
  let totalPrice = 0;   

  for (let article of storePrices){
    totalPrice += article.price * article.quantity;    
  };  
  
  const displayPrice = document.querySelector('#totalPrice');
  displayPrice.textContent = totalPrice;  
  
};

// Permet d'afficher la quantité total
const displayTotalQuantity = () => {  

  let basket = getBasket();  
  let totalQuantity = 0;

  for (let produit of basket){
    totalQuantity += produit.quantity; 
  };

  const displayQuantity = document.querySelector('#totalQuantity');
  displayQuantity.textContent = totalQuantity;  

};


