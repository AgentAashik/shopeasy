import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>

      <div className="product-card-content">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">${product.price}</p>
        <div className="product-rating">
          {product.rating.rate} ({product.rating.count} reviews)
        </div>
      </div>

      <div className="product-card-buttons">
        <Link to={`/product/${product.id}`}>
          <button className="product-card-btn view-btn">View</button>
        </Link>
        <button className="product-card-btn cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {showToast && <div className="product-toast">✅ Added to Cart!</div>}
    </div>
  );
}

export default ProductCard;
