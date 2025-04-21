let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartContainer = document.querySelector(".cart-container");

let totalTag = document.querySelector(".total-price");
let checkoutBtn = document.querySelector(".checkout-btn");

const renderSubtotal = () => {
  let totalPrice = cartItems
    .reduce((acc, item) => {
      return +item.newPrice + acc;
    }, 0)
    .toFixed(2);
  totalTag.innerText = `$ ${totalPrice}`;
  console.log(totalPrice);
};

const renderCart = () => {
  cartItems.length > 0
    ? cartItems.forEach((book) => {
        cartContainer.innerHTML += `
    <div class="cart-item">
        <div class="book-content">
          <div class="book-img">
            <img src=${book.photo} alt="Book Image" />
          </div>
          <p class="book-name">${book.name}</p>
        </div>
        <div class="price-remove">
          <div class="price"><p>$ ${book.newPrice}</p></div>
          <div class="remove-btn" data-key=${book.id}><p>Remove</p></div>
        </div>
      </div>
  `;
      })
    : ((cartContainer.innerHTML =
        "<h3 style='text-align: center; margin-top: auto; margin-bottom: auto'>Your Cart is Empty</h3>"),
      (checkoutBtn.disabled = true));

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = +btn.dataset.key;
      cartItems = cartItems.filter((book) => book.id != id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      cartContainer.innerHTML = "";
      totalTag.innerText = "";
      renderCart();
      renderSubtotal();
    });
  });
};

renderCart();
renderSubtotal();
