-- Delete existing products
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM cart;
DELETE FROM products;

-- Insert Sample Products
INSERT INTO products (name, description, price, category, image_url)
VALUES 
('Nike Running Shoes', 'Professional running shoes with advanced cushioning technology', 5999.00, 'Fashion', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'),
('Apple AirPods Pro', 'Active noise cancellation and personalized audio experience', 24900.00, 'Electronics', 'https://images.unsplash.com/photo-1600394494413-522140db8ed2?w=500'),
('Smart Watch Series 9', 'Advanced fitness tracking with always-on retina display', 35999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'),
('Blue Denim Jeans', 'Classic blue denim with comfortable fit and vibrant color', 2499.00, 'Fashion', 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500'),
('Apple iPhone 15 (Blue, 128 GB)', '128 GB ROM, 6.1 inch Super Retina XDR Display', 79900.00, 'Mobiles', 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500'),
('Sony WH-1000XM5 Headphones', 'Industry Leading Noise Cancelling with 30hr Battery', 29990.00, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'),
('Nike Air Pegasus 40', 'Responsive cushioning for everyday running', 11895.00, 'Fashion', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'),
('Samsung Galaxy Watch 6', 'AMOLED display with comprehensive health tracking', 28999.00, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'),
('Sony WH-CH720 Wireless Headphones', 'Lightweight design with 35 hour battery life', 7990.00, 'Electronics', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'),
('Casual White T-Shirt', '100% cotton comfortable casual wear', 699.00, 'Fashion', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500');

-- Verify products were added
SELECT COUNT(*) as total_products FROM products;
SELECT * FROM products;
