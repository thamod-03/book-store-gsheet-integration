window.addEventListener("scroll", function () {
  let navbar = document.querySelector("nav");
  if (window.scrollY > window.innerHeight - 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

let bookData;

const fetchData = async () => {
  const url = "./data/data.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    bookData = await response.json();
    return bookData;
  } catch (error) {
    console.error(error.message);
  }
};

// Fetching books to book card
const cartItems = []
let bookContainer = document.querySelector(".book-container");


fetchData().then(() => {
  bookData.map((book, index) => {
    bookContainer.innerHTML += `<div class="book-card">
    <div class="book-cover">
            <img src=${book.photo} alt="Book Image" />
          </div>
          <div class="book-content">
            <h3>${book.name}</h3>
            <p>
              ${book.description}
            </p>
            <div class="price-container">
                <div class="new-price">$ ${book.newPrice}</div>
                <div class="old-price">$ ${book.oldPrice}</div>
            </div>
            <button class="cart-btn" data-key=${book.id}><i class="bx bx-cart" style="margin-right: 5px; font-weight: bold;"></i>Add to Cart</button>
          </div>
          </div>`;
  });


  let selectedKey;
  document.querySelectorAll(".cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      selectedKey = button.dataset.key;

      let exist = cartItems.some((item) => item.id == selectedKey);
      if (!exist) {
        cartItems.push(bookData[+selectedKey - 1]);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        Swal.fire({
          title: "Book has added to your cart",
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "The book is already in your cart",
        });
      }
      console.log(cartItems)
    });
  });


});

