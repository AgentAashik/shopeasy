// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../global.css';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Shopeasy Products</h1>
        <p className="home-subtitle">Discover amazing deals on quality products</p>
      </header>

      <div className="ad-banner">
        <div className="ad-content">
          <h2>Summer Sale!</h2>
          <p>Up to 50% off on selected items</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </div>

      <section className="all-products">
        <h2 className="section-title">All Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="newsletter">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for exclusive offers</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default Home;
