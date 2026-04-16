# Quick Fix Guide - Flipkart Clone

## 🚨 Critical Issues to Fix Before Submission

### 1. Images Not Loading
**Issue:** Products showing "No Image" placeholder

**Root Causes:**
- Database not reset with new image URLs
- Images are SVG data URIs (not actually loading from DB)

**Fix Steps:**

```bash
# Step 1: Reset the database with SVG images
psql -U postgres -d flipkart_db -f "C:\Users\HP\Desktop\scaler\init.sql"

# Step 2: Verify the backend is running
cd C:\Users\HP\Desktop\scaler\flipkart-clone
npm run dev

# Step 3: Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
```

**Verify:**
- Open http://localhost:3000
- You should see product cards with SVG placeholders
- Each product should have a different colored graphic

---

### 2. Add Form Validation to Checkout
**Issue:** User can submit empty address

**File:** `client/app/checkout/page.js`

**Current Code:**
```javascript
if (!address.trim()) {
  alert("Please enter a shipping address");
  return;
}
```

**Improvement Needed:**
```javascript
const validateAddress = (address) => {
  const addressRegex = /^[a-zA-Z0-9\s,.-]{20,200}$/;
  return addressRegex.test(address);
};

if (!address.trim()) {
  alert("Please enter a shipping address");
  return;
}

if (!validateAddress(address)) {
  alert("Please enter a valid address (20-200 characters, alphanumeric and basic punctuation)");
  return;
}
```

---

### 3. Fix Metadata in Layout
**Current:** Says "Create Next App"

**File:** `client/app/layout.tsx`

**Fix:**
```typescript
export const metadata: Metadata = {
  title: "Flipkart Clone - Online Shopping",
  description: "Shop electronics, fashion, and more at Flipkart Clone. Free delivery on orders above ₹500.",
};
```

---

### 4. Create Environment Variables File
**File:** Create `client/.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Update API calls in:**

1. `client/app/page.tsx` (line 18):
   ```javascript
   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
   ```

2. `client/app/product/[id]/page.js` (line 22):
   ```javascript
   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`)
   ```

3. `client/app/checkout/page.js` (line 29):
   ```javascript
   axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
   ```

---

### 5. Add Loading States
**Issue:** No feedback while data is loading

**File:** `client/app/page.tsx`

**Add before return statement:**
```javascript
if (products.length === 0 && !filteredProducts.length) {
  return (
    <main className="bg-[#f1f3f6] min-h-screen">
      <Navbar />
      <div className="text-center py-12">
        <p className="text-gray-500">Loading products...</p>
      </div>
    </main>
  );
}
```

---

### 6. Add Stock Availability Display
**Issue:** Stock quantity not checked

**File:** `client/app/product/[id]/page.js`

**Add to product detail:**
```javascript
const stockStatus = product.stock_quantity > 0 ? "In Stock" : "Out of Stock";
```

**In JSX:**
```jsx
<p className={`mt-2 font-semibold ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
  {stockStatus}
</p>

{/* Disable button if out of stock */}
<button disabled={product.stock_quantity === 0} className="...">
  {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
</button>
```

---

### 7. Fix Buy Now Button
**Issue:** Buy Now should add to cart then redirect to checkout

**File:** `client/app/product/[id]/page.js`

**Current:** Shows "Buy Now" as link

**Fix:**
```javascript
const handleBuyNow = () => {
  addToCart(product);
  router.push('/checkout');
};

// In JSX:
<button 
  onClick={handleBuyNow}
  className="flex-1 bg-[#ff9f00] text-white py-3 font-bold rounded hover:bg-orange-600"
>
  Buy Now
</button>
```

---

### 8. Add Image Error Fallback
**Already Implemented! ✅**
- Images have onError handlers in both home page and product detail page
- Fallback SVG shows if image fails to load

---

### 9. Test Database Connection
**File:** `server.js`

**Add diagnostic endpoint:**
```javascript
// Add this before the PORT listener
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM products');
    res.json({ 
      status: 'ok', 
      totalProducts: result.rows[0].count,
      database: 'flipkart_db'
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Test it: http://localhost:5000/api/health
```

---

### 10. Add Null Check for Product Images
**File:** `client/app/product/[id]/page.js`

**Improve image handling:**
```javascript
const images = product.images && Array.isArray(product.images) && product.images.length > 0 
  ? product.images.filter(img => img && img.trim() !== '')
  : (product.image_url ? [product.image_url] : ['data:image/svg+xml,...']); // fallback SVG
```

---

## Testing Checklist Before Submission

### Frontend Testing ✅
- [ ] Run `npm run build` in client folder (check for errors)
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test responsive design (use DevTools)
- [ ] Test all navigation links
- [ ] Test search functionality
- [ ] Test category filters
- [ ] Add multiple products to cart
- [ ] Update quantities
- [ ] Remove items from cart
- [ ] Cart persists after page refresh
- [ ] Checkout form validation works
- [ ] Order placement succeeds
- [ ] Order confirmation shows correct ID

### Backend Testing ✅
- [ ] Check database has products: `SELECT COUNT(*) FROM products;`
- [ ] Check orders table is empty: `SELECT COUNT(*) FROM orders;`
- [ ] Test API endpoints:
  - GET http://localhost:5000/api/products
  - GET http://localhost:5000/api/products/1
  - POST http://localhost:5000/api/orders (with test data)

### Database Testing ✅
- [ ] PostgreSQL is running
- [ ] Database `flipkart_db` exists
- [ ] All tables created (products, orders, order_items)
- [ ] Sample data loaded (10 products)
- [ ] Foreign key constraints working

---

## Deployment Checklist

### Before Going Live 🚀

1. **Database**
   - [ ] Create production database on hosted provider (AWS RDS, Supabase, Railway)
   - [ ] Run init.sql on production database
   - [ ] Verify connection works

2. **Backend**
   - [ ] Update db.js with production connection string
   - [ ] Move to .env file: `PG_*` variables
   - [ ] Deploy to Render, Railway, or Heroku
   - [ ] Test API endpoints on production

3. **Frontend**
   - [ ] Update NEXT_PUBLIC_API_URL to production backend
   - [ ] Run `npm run build` - check for build errors
   - [ ] Deploy to Vercel, Netlify, or similar
   - [ ] Test all features on production

4. **Final Tests**
   - [ ] Add product to cart (check persists)
   - [ ] Complete order flow
   - [ ] Verify order saved to database
   - [ ] Test on mobile devices

---

## Important Notes

⚠️ **API Endpoint Hardcoded**
- Currently: `http://localhost:5000`
- Need to change based on deployment

✅ **Images Are Working** 
- Using SVG data URIs (always load)
- Can replace with real images later

✅ **Cart Persists**
- Uses localStorage
- Survives browser refresh

✅ **Database Schema**
- Properly designed with relationships
- Ready for production

---

## If Images Still Don't Show

1. **Check Browser Console (F12)**
   - Look for CORS errors
   - Check for 404 errors
   - Check for CSP violations

2. **Check Database**
   ```sql
   psql -U postgres flipkart_db
   SELECT name, image_url FROM products LIMIT 1;
   ```
   - Should return product with SVG data URI

3. **Check Backend Logs**
   - Terminal should show GET requests for `/api/products`
   - Look for any error messages

4. **Clear Browser Cache**
   - Close DevTools and reopen
   - Hard refresh: Ctrl+Shift+R

---

*Last Updated: April 16, 2026*
