const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
const app = express();

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Flipkart Clone Backend Running ✅', status: 'active' });
});

// API route to get all products (For the Listing Page)
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// API route to get a single product by ID (For the Detail Page)
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    
    const product = result.rows[0];
    
    // Ensure images array is always an array
    if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
      product.images = product.image_url ? [product.image_url] : [];
    }
    
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

// GET route to fetch all orders (For the Order History Page)
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.total_amount,
        o.shipping_address,
        o.created_at,
        COALESCE(json_agg(json_build_object(
          'product_id', oi.product_id,
          'quantity', oi.quantity,
          'price', oi.price,
          'product_name', p.name,
          'product_image', p.image_url
        )) FILTER (WHERE oi.id IS NOT NULL), '[]'::json) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      GROUP BY o.id, o.total_amount, o.shipping_address, o.created_at
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// POST route to place an order
app.post('/api/orders', async (req, res) => {
  const { items, total_amount, shipping_address } = req.body;
  
  try {
    // 1. Insert into 'orders' table
    const orderResult = await pool.query(
      'INSERT INTO orders (total_amount, shipping_address) VALUES ($1, $2) RETURNING id',
      [total_amount, shipping_address]
    );
    const orderId = orderResult.rows[0].id;

    // 2. Insert items into 'order_items' table
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    res.json({ success: true, orderId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Order placement failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});