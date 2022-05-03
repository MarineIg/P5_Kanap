// Récupère et l'orderId
let productId = new URL(location.href).searchParams.get("idOrder");

// Affiche l'orderId sur la page
document.querySelector("#orderId").innerHTML = productId;
