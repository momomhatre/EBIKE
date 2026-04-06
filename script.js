let cart = JSON.parse(localStorage.getItem("rentals")) || [];

function rentBike(name, price) {
  let hours = prompt("Enter rental hours:");

  if (hours && !isNaN(hours) && hours > 0) {
    let total = price * hours;

    cart.push({ name, price, hours, total });
    localStorage.setItem("rentals", JSON.stringify(cart));

    alert(name + " booked for " + hours + " hours ✅");
    updateCartCount();
  } else {
    alert("Enter valid hours!");
  }
}

function updateCartCount() {
  let count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

function goToCart() {
  window.location.href = "cart.html";
}

function goBack() {
  window.location.href = "index.html";
}

function clearCart() {
  localStorage.removeItem("rentals");
  cart = [];
  displayCart();
  updateCartCount();
}

function displayCart() {
  let list = document.getElementById("cart-items");
  let totalAmount = 0;

  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<h3>No rentals yet 🚲</h3>";
    document.getElementById("total").innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <b>${item.name}</b><br>
      ₹${item.price}/hr × ${item.hours} hrs = <b>₹${item.total}</b>
      <br><button onclick="removeItem(${index})">Remove</button>
    `;

    list.appendChild(li);
    totalAmount += item.total;
  });

  document.getElementById("total").innerText = "Total: ₹" + totalAmount;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("rentals", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

updateCartCount();