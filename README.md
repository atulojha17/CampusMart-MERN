# 🛒 CampusMart

> A campus-focused marketplace where students can buy and sell products within their college community.

CampusMart is a full-stack MERN web application designed to make buying and selling products within a campus simple, secure, and convenient.

Students can create accounts, list products for sale, browse products from other students, search and filter listings, manage their own products, save products to a wishlist, and contact sellers.

---

## 🚀 Features

### 👤 Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected routes
- Role-based authorization
- Form validation
- Secure password hashing using bcrypt

### 🛍️ Product Management
- Add new products
- Upload product images
- Edit products
- Delete products
- View product details
- Seller information
- Ownership-based product authorization

### 🔎 Product Discovery
- Browse all products
- Search products
- Filter by category
- Filter by condition
- Sort products
- Product detail pages

### ❤️ Wishlist
- Add products to wishlist
- Remove products from wishlist
- View saved products

### 👨‍💼 Admin Dashboard
- Admin-only dashboard
- View total users
- View total products
- View registered users
- View product listings
- View seller information
- Delete any product
- Role-based admin authorization

### 📱 Responsive UI
- Mobile-friendly navigation
- Responsive product layouts
- Responsive forms
- Responsive dashboard tables
- Mobile menu

### ⚠️ Error & UX Handling
- 404 Not Found page
- Loading states
- API error handling
- Retry functionality
- Confirmation before product deletion
- Form validation and user-friendly messages

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- JWT
- bcrypt

### Database
- MongoDB
- Mongoose

### Image Storage
- Cloudinary

### Development Tools
- VS Code
- Postman
- MongoDB Compass
- Git
- GitHub

---

## 📁 Project Structure

```text
CampusMart/
│
├── client/
│   └── src/
│       ├── components/
│       │   ├── Layout/
│       │   │   └── Navbar.jsx
│       │   ├── AdminRoute.jsx
│       │   └── ProtectedRoute.jsx
│       │
│       ├── context/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Products.jsx
│       │   ├── ProductDetails.jsx
│       │   ├── AddProduct.jsx
│       │   ├── EditProduct.jsx
│       │   ├── MyProducts.jsx
│       │   ├── Wishlist.jsx
│       │   ├── AdminDashboard.jsx
│       │   └── NotFound.jsx
│       │
│       ├── routes/
│       └── services/
│
├── server/
│   ├── config/
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── productController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── wishlistRoutes.js
│   │
│   └── server.js
│
└── README.md