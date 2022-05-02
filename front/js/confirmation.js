let productId = new URL(location.href).searchParams.get("idOrder");

document.querySelector("#orderId").innerHTML = productId;
