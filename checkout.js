let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const form = document.getElementById("checkout-form");

let boughtBooks = cartItems.map((book, index) => {
  return book.name;
});

let subTotal = cartItems
  .reduce((acc, book) => {
    return +book.newPrice + acc;
  }, 0)
  .toFixed(2);

let bookCount = cartItems.length;

let totalEl = document.querySelector(".total");
let countEl = document.querySelector(".count");

totalEl.innerText = `Total Price: $ ${subTotal}`;
countEl.innerText = `Books: ${bookCount}`;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value.trim();

  const formData = new FormData(form);
  const data = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    phone: formData.get("phone").trim(),
    address: formData.get("address").trim(),
    city: formData.get("city").trim(),
    province: formData.get("province").trim(),
    zipcode: formData.get("zipcode").trim(),
    boughtBooks: boughtBooks.join(", ").trim(),
    timestamp: new Date(),
  };

  await fetch(
    "YOUR_WEB_APP_URL",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    }
  );

  if (phone.length != 10) {
    alert("Phone number must have 10 digits");
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your order has submitted!",
      showConfirmButton: false,
      timer: 1500,
    });
    form.reset();
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  }
});
