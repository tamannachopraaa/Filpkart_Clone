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
