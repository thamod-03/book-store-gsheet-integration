
# Book Store - Web Application

A simple one-product e-commerce website built as a university assignment. Users can browse a selection of books, add them to a cart, and place an order, which is submitted to a Google Spreadsheet using Google Apps Script.

## 🌐 Live Website

👉 [Visit here](https://book-store-thamod.netlify.app/)

## 📁 Project Structure

```
📁 data
    📄 data.json (book data)
📁 favicons
📁 src
    📁 books (images of all books)
    📄 hero-image.jpg (main banner)
📁 styles
    📄 style.css (main)
    📄 cart-style.css
    📄 checkout-style.css
📄 index.html
📄 cart.html
📄 checkout.html
📄 script.js
📄 cart.js
📄 checkout.js
```

## 📦 Features

- View books and hero banner
- Add to cart functionality
- Cart and Checkout pages
- Data submission to Google Sheets
- Responsive layout
- Neat UI with custom styles

## 🛠️ Technologies Used

- HTML, CSS, JavaScript
- Google Apps Script (Backend for order storage)
- Netlify (for deployment)

---

## 📤 Google Apps Script Backend Setup

This project uses Google Apps Script to handle form submissions and store them in Google Sheets.

### 🔁 Script Code:

Paste the following code into your Google Apps Script editor:

```js
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.name,
    data.email,
    data.phone,
    data.address,
    data.city,
    data.province,
    data.zipcode,
    data.boughtBooks,
    data.timestamp
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### 🧰 Setup Steps:

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project.
3. Paste the above code.
4. Link to a new or existing Google Sheet.
5. Click **Deploy > New deployment**.
6. Select **Web app**.
7. Set access to **Anyone** and deploy.
8. Copy the **Web App URL** and replace it in `checkout.js`.

```js
await fetch("YOUR_SCRIPT_URL", {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-Type": "application/json"
  },
  mode: "no-cors"
});
```

---


## 📌 Author

- GitHub: [thamod-03](https://github.com/thamod-03)

---
