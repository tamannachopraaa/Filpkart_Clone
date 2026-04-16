# Flipkart Clone - E-Commerce Web Application

A full-stack e-commerce web application built with modern web technologies. Users can browse products, view details, add items to cart, and place orders without requiring login.

## Tech Stack

### Frontend
- **Next.js 16.2.3** - React-based framework with built-in routing and server-side rendering
- **React 19** - UI library for building interactive components
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **Axios** - HTTP client for API communication
- **Context API** - State management for shopping cart

### Backend
- **Node.js & Express** - RESTful API server
- **PostgreSQL** - Relational database for products and orders
- **CORS** - Cross-origin resource sharing for frontend-backend communication

## Features Implemented

✅ **Product Listing** - Browse all products with images, price, and category  
✅ **Product Details** - View individual product with full information  
✅ **Shopping Cart** - Add to cart with quantity management using Context API + LocalStorage  
✅ **Cart View** - View all items, adjust quantities, remove items  
✅ **Checkout Flow** - Enter shipping address and review order summary  
✅ **Order Placement** - Save orders to database with order items  
✅ **Order Confirmation** - Display order ID after successful placement  
✅ **Responsive Design** - Works on desktop and mobile devices

## Project Structure

```
flipkart-clone/
├── client/                          # Next.js Frontend
│   ├── app/
│   │   ├── components/
│   │   │   └── Navbar.js           # Navigation with cart count
│   │   ├── context/
│   │   │   └── CartContext.js      # Cart state management
│   │   ├── product/
│   │   │   └── [id]/page.js        # Product detail page
│   │   ├── cart/
│   │   │   └── page.js             # Shopping cart page
│   │   ├── checkout/
│   │   │   └── page.js             # Checkout with address form
│   │   ├── order-confirmation/
│   │   │   └── [id]/page.js        # Order confirmation page
│   │   ├── page.tsx                # Home page (product listing)
│   │   ├── layout.tsx              # Root layout with CartProvider
│   │   └── globals.css             # Global styles
│   ├── package.json
│   └── next.config.ts
│
├── server.js                        # Express backend server
├── db.js                            # PostgreSQL connection
├── package.json
├── init.sql                         # Database schema
└── README.md                        # This file
```

## Database Schema

The application uses PostgreSQL with the following tables:

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url VARCHAR(500),
  stock_quantity INT DEFAULT 0
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:** (if not exists)
   ```
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_DATABASE=flipkart_db
   DB_PORT=5432
   ```

3. **Initialize database:**
   ```bash
   psql -U postgres -d flipkart_db -f init.sql
   ```

4. **Start backend server:**
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch all products |
| GET | `/api/products/:id` | Fetch product by ID |
| POST | `/api/orders` | Place a new order |

### POST /api/orders - Request Body
```json
{
  "items": [
    {
      "id": 1,
      "name": "Product Name",
      "price": "1000.00",
      "quantity": 2,
      "image_url": "https://..."
    }
  ],
  "total_amount": "2000.00",
  "shipping_address": "123 Main St, City, State 12345"
}
```

### Response
```json
{
  "success": true,
  "orderId": 1
}
```

## How to Use

1. **Browse Products** - Visit homepage to see all available products
2. **View Details** - Click on any product card to see full details
3. **Add to Cart** - Click "ADD TO CART" button on product detail page
4. **Cart Badge** - Navbar shows count of items in cart
5. **View Cart** - Click "Cart" in navbar to view all items
6. **Adjust Quantities** - Use +/- buttons to change quantities
7. **Checkout** - Click "PLACE ORDER" to proceed to checkout
8. **Enter Address** - Provide shipping address on checkout page
9. **Confirm Order** - Review summary and click "CONFIRM ORDER"
10. **Order Confirmation** - See order ID on confirmation page

## State Management

- **Cart State** - Managed using React Context API
- **Cart Persistence** - Automatically saved to browser's LocalStorage
- **Cart Recovery** - Cart items restored on page refresh
- **Search & Filter** - Search by product name or filter by category
- **Category Icons** - Visual indicators for different product categories
- **Responsive UI** - Works seamlessly on mobile, tablet, and desktop
- **Order Tracking** - View order confirmation with order ID

## Installation & Setup Guide

### Prerequisites
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **PostgreSQL** v12+ ([Download](https://www.postgresql.org/))
- **Git** (for cloning repository)
- **npm** or **yarn** package manager

### Step 1: Database Setup

1. **Start PostgreSQL service**
   ```bash
   # Windows: PostgreSQL should start automatically
   # Mac: brew services start postgresql
   # Linux: sudo service postgresql start
   ```

2. **Create database:**
   ```bash
   psql -U postgres -c "CREATE DATABASE flipkart_db;"
   ```

3. **Run initialization script:**
   ```bash
   psql -U postgres -d flipkart_db -f init.sql
   ```

4. **Verify database:**
   ```bash
   psql -U postgres -d flipkart_db
   SELECT COUNT(*) FROM products;
   \q
   ```
   Should show 10 products.

### Step 2: Backend Setup

1. **Install dependencies:**
   ```bash
   cd C:\Users\HP\Desktop\scaler\flipkart-clone
   npm install
   ```

2. **Update database credentials (if needed):**
   Edit `db.js`:
   ```javascript
   const pool = new Pool({
     user: 'postgres',
     password: 'your_password', // Change if different
     host: 'localhost',
     database: 'flipkart_db',
     port: 5432,
   });
   ```

3. **Start backend server:**
   ```bash
   npm run dev
   # Or: node server.js
   ```
   ✅ Server runs on `http://localhost:5000`

### Step 3: Frontend Setup

1. **Navigate to client folder:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   - Create/edit `client/.env.local`:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   ✅ App runs on `http://localhost:3000`

## Quick Start

After setup, open your browser:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api/products

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create new order |

### Example Requests

**Get All Products:**
```bash
curl http://localhost:5000/api/products
```

**Get Single Product:**
```bash
curl http://localhost:5000/api/products/1
```

**Create Order:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {"id": 1, "name": "Phone", "price": "50000", "quantity": 1, "image_url": "..."}
    ],
    "total_amount": "50000",
    "shipping_address": "123 Main St, City, PIN 12345"
  }'
```

## Deployment Guide

### Environment Variables

Before deployment, update these for production:

**Frontend (`client/.env.production`):**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

**Backend (`db.js`):**
```javascript
// Use environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
```

### Deploy Frontend (Vercel)

1. **Build locally:**
   ```bash
   cd client
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   git push origin main
   ```

3. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your repository
   - Set environment variable: `NEXT_PUBLIC_API_URL`
   - Deploy

### Deploy Backend (Render/Railway)

**Render.com:**
1. Push code to GitHub
2. Create New Web Service on Render
3. Connect GitHub repository
4. Set environment variables:
   - `DB_USER=postgres`
   - `DB_PASSWORD=...`
   - `DB_HOST=...`
   - `DB_NAME=flipkart_db`
   - `DB_PORT=5432`
5. Deploy

**Railway.app:**
1. Connect GitHub account
2. Create new project
3. Add PostgreSQL service
4. Add Node.js service
5. Link database
6. Deploy

### Production Checklist

- [ ] Database migrated to cloud (AWS RDS, Supabase, Railway)
- [ ] Backend environment variables configured
- [ ] Frontend environment variables updated
- [ ] CORS configured for production domain
- [ ] SSL/HTTPS enabled
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Database backups configured
- [ ] API rate limiting configured  
- [ ] Monitoring/logging setup

## Troubleshooting

### Issue: Products Not Loading

**Symptoms:** "No Image" placeholder or 404 error

**Solutions:**
1. Check database has products:
   ```bash
   psql -U postgres -d flipkart_db
   SELECT COUNT(*) FROM products;
   ```

2. Verify backend is running:
   ```bash
   curl http://localhost:5000/api/products
   ```

3. Check browser console for errors (F12)

4. Restart backend: Stop and run `npm run dev` again

### Issue: Cart Not Persisting

**Symptoms:** Cart empties after page refresh

**Solutions:**
1. Enable LocalStorage in browser
2. Check browser privacy/incognito mode
3. Clear browser cache and cookies
4. Try different browser
5. Check DevTools → Application → LocalStorage

### Issue: Order Placement Fails

**Symptoms:** "Order failed" error or order not in database

**Solutions:**
1. Verify address is at least 20 characters
2. Check backend console for errors
3. Verify database connection:
   ```bash
   psql -U postgres -d flipkart_db
   SELECT COUNT(*) FROM orders;
   ```

4. Check CORS is enabled in `server.js`
5. Restart backend server

### Issue: StyleSheet/CSS Not Loading

**Symptoms:** Page looks ugly/unstyled

**Solutions:**
1. Wait for Tailwind CSS build to complete
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear `.next` folder:
   ```bash
   cd client
   rm -rf .next
   npm run dev
   ```

## Features To-Do

- [ ] User authentication (login/signup)
- [ ] Order history page
- [ ] Product reviews/ratings
- [ ] Wishlist functionality
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Advanced filters & sorting
- [ ] Product recommendations
- [ ] Real-time inventory updates
- [ ] Multi-language support
- [ ] Dark mode

## Performance Optimization

- Image lazy loading implemented
- Responsive images for mobile
- CSS minification with Tailwind
- Database indexing recommended
- API caching strategies
- LocalStorage for cart (no server calls)

## Security Considerations

- ✅ CORS enabled for API
- ✅ Input validation on forms
- ✅ SQL injection prevented (using parameterized queries)
- ⚠️ Add password hashing when auth is implemented
- ⚠️ Add HTTPS for production
- ⚠️ Add rate limiting to API
- ⚠️ Add environment variables for sensitive data
- ⚠️ Implement payment security (PCI compliance)

## Testing

### Manual Testing Checklist

**Homepage:**
- [ ] All products load
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Clicking product opens detail page
- [ ] Responsive layout works

**Product Detail:**
- [ ] Image displays
- [ ] Add to Cart button works
- [ ] Buy Now redirects to checkout
- [ ] Quantity selector works
- [ ] Price displays correctly

**Cart:**
- [ ] Items display correctly
- [ ] Quantity +/- buttons work
- [ ] Remove item works
- [ ] Total price calculates correctly
- [ ] Cart persists after refresh

**Checkout:**
- [ ] Address form accepts input
- [ ] Form validates address length
- [ ] Place Order button works
- [ ] Order saves to database

**Order Confirmation:**
- [ ] Order ID displays
- [ ] Status shows "Confirmed"
- [ ] Continue Shopping button works
- [ ] Order appears in database

## Database Backup

```bash
# Backup database
pg_dump -U postgres flipkart_db > backup.sql

# Restore database
psql -U postgres -d flipkart_db < backup.sql
```

## Code Quality

- ESLint configured
- Prettier formatting
- Next.js best practices followed
- React hooks best practices
- Component modularization

## Support & Questions

For detailed troubleshooting, see `QUICK_FIX_GUIDE.md`
For feature assessment, see `FEATURE_CHECKLIST.md`

## License

This project is created for educational purposes as part of SDE Intern assignment.

## Author

Built with React, Next.js, Express, and PostgreSQL
Inspired by Flipkart's design and user experience
