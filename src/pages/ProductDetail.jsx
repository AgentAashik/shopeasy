import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className='product-detail'>
      <h1 className='inner-title'>{product.title}</h1>
      <img src={product.image} alt={product.title} className='inner-image' />
      
      <div className='product-info-right'>
        <div className='inner-rating'>
          <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
        </div>
        <p className='inner-price'>
          <strong>Price:</strong> ${product.price}
        </p>
        <p className='inner-description'>
          <strong>Description:</strong> {product.description}
        </p>

        <button 
          className='inner-button' 
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
