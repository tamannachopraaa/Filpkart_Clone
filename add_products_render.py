#!/usr/bin/env python3
"""
Script to add sample products to Render PostgreSQL database
Run this to populate your Render database with products
"""

import psycopg2
import sys

print("=" * 60)
print("Flipkart Clone - Render Database Product Loader")
print("=" * 60)

# Get database connection details from user or environment
print("\n📝 Enter your Render PostgreSQL database credentials:")
print("(You can find these in Render Dashboard → PostgreSQL → Connections)\n")

host = input("Enter Database Host (e.g., dpg-xxx.render.com): ").strip()
database = input("Enter Database Name (default: flipkart_db): ").strip() or "flipkart_db"
user = input("Enter Username (default: postgres): ").strip() or "postgres"
password = input("Enter Password: ").strip()
port = input("Enter Port (default: 5432): ").strip() or "5432"

db_params = {
    'host': host,
    'port': int(port),
    'database': database,
    'user': user,
    'password': password,
}

print(f"\n🔌 Connecting to: {user}@{host}:{port}/{database}")

try:
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()
    print("✅ Connected to Render database successfully!\n")
    
    # Clear existing data
    print("🗑️  Clearing existing data...")
    cursor.execute("DELETE FROM order_items;")
    cursor.execute("DELETE FROM orders;")
    cursor.execute("DELETE FROM cart;")
    cursor.execute("DELETE FROM products;")
    conn.commit()
    print("✅ Old data cleared!\n")
    
    # Add sample products
    print("📦 Adding 10 sample products...\n")
    
    products = [
        ('Nike Running Shoes', 'Professional running shoes with advanced cushioning technology', 5999.00, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'),
        ('Apple AirPods Pro', 'Active noise cancellation and personalized audio experience', 24900.00, 'Electronics', 'https://images.unsplash.com/photo-1600394494413-522140db8ed2?w=500&h=500&fit=crop'),
        ('Smart Watch Series 9', 'Advanced fitness tracking with always-on retina display', 35999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'),
        ('Blue Denim Jeans', 'Classic blue denim with comfortable fit and vibrant color', 2499.00, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop'),
        ('Apple iPhone 15 (Blue, 128 GB)', '128 GB ROM, 6.1 inch Super Retina XDR Display', 79900.00, 'Mobiles', 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop'),
        ('Sony WH-1000XM5 Headphones', 'Industry Leading Noise Cancelling with 30hr Battery', 29990.00, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop'),
        ('Nike Air Pegasus 40', 'Responsive cushioning for everyday running', 11895.00, 'Fashion', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop'),
        ('Samsung Galaxy Watch 6', 'AMOLED display with comprehensive health tracking', 28999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'),
        ('Sony WH-CH720 Wireless Headphones', 'Lightweight design with 35 hour battery life', 7990.00, 'Electronics', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop'),
        ('Casual White T-Shirt', '100% cotton comfortable casual wear', 699.00, 'Fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop'),
    ]
    
    insert_query = """
    INSERT INTO products (name, description, price, category, image_url)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    for i, product in enumerate(products, 1):
        cursor.execute(insert_query, product)
        print(f"  {i:2d}. ✅ {product[0]:<40} ₹{product[2]:>8.2f}")
    
    conn.commit()
    print("\n✅ All products added successfully!\n")
    
    # Verify
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    cursor.execute("SELECT id, name, price, category FROM products ORDER BY id")
    products_list = cursor.fetchall()
    
    print(f"📊 Total products in Render database: {count}\n")
    
    print("📋 Products Summary:")
    print("-" * 70)
    print(f"{'ID':<4} {'Name':<30} {'Price':<12} {'Category':<15}")
    print("-" * 70)
    for row in products_list:
        print(f"{row[0]:<4} {row[1]:<30} ₹{row[2]:<11.2f} {row[3]:<15}")
    print("-" * 70)
    
    cursor.close()
    conn.close()
    print("\n✅ Database connection closed successfully!")
    print("✅ Your Render database is now ready with products!\n")
    
except psycopg2.Error as err:
    print(f"\n❌ Database error: {err}")
    print("\n📝 Troubleshooting:")
    print("   1. Make sure your Render PostgreSQL is running")
    print("   2. Check that you're using the correct credentials")
    print("   3. Ensure your IP is whitelisted in Render (if applicable)")
    print("   4. Try using the External Connection String from Render dashboard")
    sys.exit(1)
except Exception as err:
    print(f"\n❌ Error: {err}")
    sys.exit(1)
