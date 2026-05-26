# 🛒 E-Commerce Frontend

A React frontend for the E-Commerce API built with Vite and React Router.

---

## 🚀 Live Demo

- **Frontend:** coming soon
- **Backend API:** [E-Commerce API](https://github.com/Nick0099/E_Commerce)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Auth | JWT with auto token refresh |

---

## 📂 Project Structure
src/
├── api/
│   └── axios.js        # Configured axios instance with JWT interceptors
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   └── Orders.jsx
├── components/
│   └── Navbar.jsx
├── App.jsx             # Routes and private route protection
└── main.jsx

---

## ✨ Features

- **Auth** — register, login, logout, JWT auto refresh
- **Products** — browse all products, search by name, view detail
- **Cart** — add to cart, update quantity, remove items, clear cart
- **Checkout** — shipping address, coupon code support, place order
- **Orders** — view order history, cancel pending orders
- **Protected Routes** — cart and orders require login

---

## 🏃 Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/Nick0099/ecommerce-frontend.git
cd ecommerce-frontend
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the backend**

Make sure the Django API is running at `http://localhost:8000`.
See [E-Commerce API](https://github.com/Nick0099/E_Commerce) for setup instructions.

**4. Start the frontend**
```bash
npm run dev
```

**5. Open in browser**

http://localhost:5173

---

## 📸 Pages

| Page | Route |
|---|---|
| Products | / |
| Product Detail | /products/:id |
| Login | /login |
| Register | /register |
| Cart | /cart |
| Orders | /orders |

---

## 📬 Contact

Nischal Neupane — nischalneupane45@gmail.com

[![GitHub](https://img.shields.io/badge/GitHub-Nick0099-181717?style=flat&logo=github)](https://github.com/Nick0099)
