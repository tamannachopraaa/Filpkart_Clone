# Flipkart Clone - E-Commerce Application

A full-stack e-commerce app with product browsing, shopping cart, checkout, and order management.

## 🛠 Tech Stack

**Frontend:** Next.js 16, React 19, Tailwind CSS 4, Context API  
**Backend:** Node.js, Express  
**Database:** PostgreSQL

## ✨ Features

✅ Product listing & search  
✅ Product details page  
✅ Shopping cart with quantity management  
✅ Checkout with address form  
✅ Order placement & confirmation  
✅ Responsive design  
✅ Cart persistence with LocalStorage  

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v12+

### 1. Database Setup
```bash
psql -U postgres -c "CREATE DATABASE flipkart_db;"
psql -U postgres -d flipkart_db -f init.sql
```

### 2. Backend Setup
```bash
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
flipkart-clone/
├── server.js              # Express backend
├── db.js                  # PostgreSQL connection
├── init.sql               # Database schema
├── package.json
│
└── client/                # Next.js frontend
    ├── app/
    │   ├── page.tsx       # Homepage (product listing)
    │   ├── components/    # Navbar, etc.
    │   ├── context/       # CartContext
    │   ├── product/[id]   # Product detail page
    │   ├── cart/          # Shopping cart
    │   ├── checkout/      # Checkout page
    │   └── order-confirmation/[id]
    └── package.json
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create new order |

## 📦 Database Schema

**Products:** id, name, description, price, category, image_url, stock_quantity  
**Orders:** id, total_amount, shipping_address, created_at  
**Order Items:** id, order_id, product_id, quantity, price
