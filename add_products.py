#!/usr/bin/env python3
"""
Script to add sample products to the Flipkart Clone database
Run this from the project root directory
"""

import psycopg2
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database connection parameters - try multiple sources
db_params = {
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'tamanna1234'),
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': os.getenv('DB_PORT', '5432'),
    'database': os.getenv('DB_DATABASE', 'flipkart_db'),
}

print(f"Connecting to database: {db_params['host']}:{db_params['port']}/{db_params['database']}")

try:
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()
    print("✅ Connected to database successfully!")
    
    # Clear existing data
    print("\n🗑️  Clearing existing data...")
    cursor.execute("DELETE FROM order_items;")
    cursor.execute("DELETE FROM orders;")
    cursor.execute("DELETE FROM cart;")
    cursor.execute("DELETE FROM products;")
    conn.commit()
    print("✅ Old data cleared!")
    
    # Add sample products
    print("\n📦 Adding sample products...")
    
    products = [
        ('Nike Running Shoes', 'Professional running shoes with advanced cushioning technology', 5999.00, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'),
        ('Apple AirPods Pro', 'Active noise cancellation and personalized audio experience', 24900.00, 'Electronics', 'https://images.unsplash.com/photo-1600394494413-522140db8ed2?w=500'),
        ('Smart Watch Series 9', 'Advanced fitness tracking with always-on retina display', 35999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'),
        ('Blue Denim Jeans', 'Classic blue denim with comfortable fit and vibrant color', 2499.00, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500'),
        ('Apple iPhone 15 (Blue, 128 GB)', '128 GB ROM, 6.1 inch Super Retina XDR Display', 79900.00, 'Mobiles', 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500'),
        ('Sony WH-1000XM5 Headphones', 'Industry Leading Noise Cancelling with 30hr Battery', 29990.00, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'),
        ('Nike Air Pegasus 40', 'Responsive cushioning for everyday running', 11895.00, 'Fashion', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'),
        ('Samsung Galaxy Watch 6', 'AMOLED display with comprehensive health tracking', 28999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'),
        ('Sony WH-CH720 Wireless Headphones', 'Lightweight design with 35 hour battery life', 7990.00, 'Electronics', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'),
        ('Casual White T-Shirt', '100% cotton comfortable casual wear', 699.00, 'Fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'),
    ]
    
    insert_query = """
    INSERT INTO products (name, description, price, category, image_url)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    for product in products:
        cursor.execute(insert_query, product)
        print(f"  ✅ Added: {product[0]}")
    
    conn.commit()
    print("\n✅ All products added successfully!")
    
    # Verify
    cursor.execute("SELECT COUNT(*) FROM products")
    count = cursor.fetchone()[0]
    print(f"\n📊 Total products in database: {count}")
    
    cursor.close()
    conn.close()
    print("\n✅ Database connection closed.")
    
except psycopg2.Error as err:
    print(f"\n❌ Database error: {err}")
    print("\n📝 Make sure your database is running and credentials are correct!")
    print("   Check your .env file or db.js for connection parameters.")
    exit(1)
except Exception as err:
    print(f"\n❌ Error: {err}")
    exit(1)
