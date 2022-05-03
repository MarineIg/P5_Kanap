const verifFirstName = (firstName) => {
  
  if (!validator.isName(firstName)) {
    
    firstNameError.style.display = "inline";
    firstNameError.textContent = "Format incorrect";
    return false; 
    
  }else{
    
    firstNameError.style.display = "none";
    return true;
  };

};

const verifLastName = (lastName) => {
  
  if (!validator.isName(lastName)) {
    
    lastNameError.style.display = "inline";
    lastNameError.textContent = "Format incorrect"; 
    return false;    

  }else{
    
    lastNameError.style.display = "none";
    return true;
  };

};

const verifAddress = (address) => {
  
  if (!validator.isAddress(address)) {
    
    addressError.style.display = "inline";
    addressError.textContent = "Format incorrect"; 
    return false;
  
  }else{
    
    addressError.style.display = "none";
    return true;
  };

};

const verifCity = (city) => {
  
  if (!validator.isName(city)) {
   
    cityError.style.display = "inline";
    cityError.textContent = "Format incorrect"; 
    return false;
    
  }else{
    
    cityError.style.display = "none";
    return true;
  };

};

const verifEmail = (email) => {
  
  if (!validator.isEmail(email)) {
    
    emailError.style.display = "inline";
    emailError.textContent = "Format incorrect";
    return false; 
    
  }else{
    
    emailError.style.display = "none";
    return true;
  };

};

// Permet de vérifier si tous les champs sont remplis et envoie le formulaire
const btnSubmitVerif = () => {

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
    contact =  {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value
    };
    for (let product of panier){      
      id = product.idProduct;
      products.push(id);
    };
    send();  
  };

};

// Permet d'envoyer le formulaire et récupère l'orderId
const send = () => {

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {      
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({contact, products}),
  })

    .then((res) => {
      if (res.ok) {
        return res.json();        
      };
    })

    .then((value) => {
      let result = value.orderId;      
      document.location.href = 'confirmation.html?idOrder=' + result;
      localStorage.clear();
      
    })

    .catch((err) => {
    console.log("erreur :", err);
    });

}; 