# 🚀 Step-by-Step: Fix Missing Products on Render

## The Problem
- Backend returning 500 error (database not connected)
- Frontend shows "No products found"
- Environment variables not configured on Render

---

## ✅ SOLUTION: Set Environment Variables on Render

### **STEP 1: Go to Render Dashboard**
1. Open: https://dashboard.render.com
2. Login with your account
3. You should see your services listed

---

### **STEP 2: Configure Backend Service**

#### A. Click on "flipkart-backend" service
   - URL format: https://flipkart-backend-85zq.onrender.com

#### B. Click the "Environment" tab (left sidebar)

#### C. Click "Add Environment Variable"

#### D. Add EACH variable separately:

**Variable 1:**
```
KEY: DB_HOST
VALUE: dpg-d7g7tbe7r5hc73d3ibtg-a.oregon-postgres.render.com
```

**Variable 2:**
```
KEY: DB_USER
VALUE: postgres1
```

**Variable 3:**
```
KEY: DB_PASSWORD
VALUE: y4UAoVbjfywVc4DP8e2F0GTCuBrzOmwi
```

**Variable 4:**
```
KEY: DB_DATABASE
VALUE: flipkart_db_m1da
```

**Variable 5:**
```
KEY: DB_PORT
VALUE: 5432
```

#### E. Click "Save Changes" button

---

### **STEP 3: Redeploy Backend**

1. Click the "Deploys" tab
2. Click the blue "Manual Deploy" button
3. Wait for deployment to complete (shows green checkmark)
   - This takes 2-5 minutes
   - You'll see the build logs

---

### **STEP 4: Configure Frontend Service**

1. Go back to Dashboard (click Render logo)
2. Click on "flipkart-frontend" service
3. Click "Environment" tab
4. Click "Add Environment Variable"
5. Add this:

```
KEY: NEXT_PUBLIC_API_URL
VALUE: https://flipkart-backend-85zq.onrender.com
```

6. Click "Save Changes"

---

### **STEP 5: Redeploy Frontend**

1. Click "Deploys" tab
2. Click "Manual Deploy" button
3. Wait for build to complete

---

### **STEP 6: Test**

1. Go to your frontend: **https://flipkart-frontend-xxx.onrender.com**
2. Refresh the page (Ctrl+F5 to clear cache)
3. You should now see **10 products** displayed! 🎉

---

## ⚠️ COMMON ISSUES

**Issue: Still no products after all steps**
- Solution: User browser dev tools (F12) → Network tab → Check if `/api/products` returns data
- If error 500 still shows: Environment variables might not have been saved properly, try again

**Issue: Products load but images broken**
- Solution: This is OK, the Unsplash links sometimes fail on free plans
- Products and prices still work fine

**Issue: Can't find "Environment" tab**
- Solution: Make sure you're on the right service
- Check that you're logged into Render dashboard

---

## 📝 MANUAL VERIFICATION

To confirm backend works, test this URL in browser:
```
https://flipkart-backend-85zq.onrender.com/api/products
```

Should return JSON with 10 products if configured correctly.

---

**When all steps are done and services redeploy, products WILL appear! ✅**
