# Flipkart Clone - E-Commerce Application

## 🌐 Live Website
**[https://flipkart-frontend-6qax.onrender.com/](https://flipkart-frontend-6qax.onrender.com/)**


A full-stack e-commerce app with product browsing, shopping cart, checkout, and order management.

## 🛠 Tech Stack

**Frontend:** Next.js 16, React 19, Tailwind CSS 4, Context API  
**Backend:** Node.js, Express  
**Database:** PostgreSQL

## ✨ Features

✅ **Product listing & search** - Browse and find items instantly  
✅ **Product details page** - View full product info, images, and descriptions  
✅ **Shopping cart** - Add items with quantity management  
✅ **Checkout flow** - Enter address and review order  
✅ **Order confirmation** - Get order ID and confirmation page  
✅ **Responsive design** - Works on mobile, tablet, and desktop  
✅ **Cart persistence** - Items saved in LocalStorage, survives page refresh  

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- PostgreSQL v12+

### First-Time Installation

#### 1. Database Setup
```bash
psql -U postgres -c "CREATE DATABASE flipkart_db;"
psql -U postgres -d flipkart_db -f init.sql
```

#### 2. Backend Installation
```bash
npm install
```

#### 3. Frontend Installation
```bash
cd client
npm install
```

Create `client/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Application

**Terminal 1 - Backend:**
```bash
npm run dev
```
Runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Runs on `http://localhost:3000`

## 📁 Project Structure

```
flipkart-clone/
├── server.js              # Express backend
├── db.js                  # PostgreSQL connection
├── init.sql               # Database schema
└── client/                # Next.js frontend
    └── app/
        ├── page.tsx       # Homepage (product listing)
        ├── components/    # Navbar, Footer
        ├── context/       # Cart & Wishlist state
        ├── product/[id]   # Product detail
        ├── cart/          # Shopping cart
        ├── checkout/      # Checkout page
        └── order-confirmation/[id]
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create new order |

## 📦 Database Schema

| Table | Columns |
|-------|---------|
| **Products** | id, name, description, price, category, image_url, stock_quantity |
| **Orders** | id, total_amount, shipping_address, created_at |
| **Order Items** | id, order_id, product_id, quantity, price |

[GitHub](https://github.com/tamannachopraaa/Filpkart_Clone) | [Live Demo](#)
