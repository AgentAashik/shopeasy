import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const handleCheckout = () => {
    alert('Thank you for your purchase!');
  };

  return (
    <div className="page container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '12px',
              borderBottom: '1px solid #eee',
              paddingBottom: '10px'
            }}>
              <img
                src={item.image}
                alt={item.title}
                width={60}
                style={{ objectFit: 'contain' }}
              />
              <div style={{ flex: 1 }}>
                <strong>{item.title}</strong>
                <div style={{ marginTop: '4px' }}>
                  Qty:
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) => updateQty(item.id, e.target.value)}
                    onBlur={(e) => {
                      if (!e.target.value || Number(e.target.value) < 1) {
                        updateQty(item.id, 1);
                      }
                    }}
                    style={{
                      width: 50,
                      marginLeft: 10,
                      padding: '4px',
                      borderRadius: '4px',
                      border: '1px solid #ccc'
                    }}
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold' }}>
                  ${(item.price * (item.qty || 1)).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginTop: '6px',
                    backgroundColor: '#f03d3d',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 20 }}>
            <p style={{ fontSize: '1.2rem' }}>Total: ${total}</p>

            <button
              onClick={handleCheckout}
              style={{
                marginTop: '16px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
