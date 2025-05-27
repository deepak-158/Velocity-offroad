import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const { cartCount, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div className={`cart-icon-container ₹{className || ''}`} style={{ position: 'relative' }}>
      <button 
        onClick={toggleCart}
        style={{
          background: 'none',
          border: 'none',
          position: 'relative',
          padding: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          color: 'inherit'
        }}
        aria-label="Shopping cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            backgroundColor: 'var(--color-primary-600)',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {cartCount}
          </span>
        )}
      </button>

      {isCartOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 100
            }}
            onClick={toggleCart}
          />
          
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            width: '320px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            zIndex: 101,
            overflow: 'hidden'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>Your Cart</h3>
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map((item, index) => (
                    <div 
                      key={`₹{item._id}-₹{item.size}-₹{item.color}-₹{index}`}
                      style={{
                        padding: '16px',
                        borderBottom: '1px solid #E5E7EB',
                        display: 'flex',
                        gap: '12px'
                      }}
                    >
                      <div style={{ width: '64px', height: '64px', flexShrink: 0 }}>
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</h4>
                        
                        {(item.size || item.color) && (
                          <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '4px' }}>
                            {item.size && <span>Size: {item.size}</span>}
                            {item.size && item.color && <span> | </span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        )}
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-primary-600)' }}>
                            ₹{formatPrice(item.discountPercentage 
                              ? item.price * (1 - item.discountPercentage / 100) * item.quantity
                              : item.price * item.quantity
                            )}
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity - 1, item.size, item.color)}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                border: '1px solid #D1D5DB',
                                background: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              -
                            </button>
                            
                            <span style={{ fontSize: '0.875rem' }}>{item.quantity}</span>
                            
                            <button 
                              onClick={() => updateQuantity(item._id, item.quantity + 1, item.size, item.color)}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '4px',
                                border: '1px solid #D1D5DB',
                                background: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              +
                            </button>
                            
                            <button 
                              onClick={() => removeFromCart(item._id, item.size, item.color)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#EF4444',
                                padding: '4px'
                              }}
                              aria-label="Remove item"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '32px 16px', textAlign: 'center', color: '#6B7280' }}>
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ padding: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '16px',
                  fontWeight: 600
                }}>
                  <span>Total</span>
                  <span>₹{formatPrice(cartTotal)}</span>
                </div>
                
                <button
                  onClick={() => {
                    // Create WhatsApp message with cart items
                    let message = "Hello, I would like to place an order:%0A%0A";
                    
                    // Add each item details
                    cartItems.forEach((item, index) => {
                      message += `${index + 1}. ${item.name}`;
                      
                      // Add size and color if available
                      if (item.size || item.color) {
                        message += " (";
                        if (item.size) message += `Size: ${item.size}`;
                        if (item.size && item.color) message += ", ";
                        if (item.color) message += `Color: ${item.color}`;
                        message += ")";
                      }
                      
                      // Add price and quantity
                      const itemPrice = item.discountPercentage 
                        ? item.price * (1 - item.discountPercentage / 100)
                        : item.price;
                      
                      message += `%0AQuantity: ${item.quantity}`;
                      message += `%0APrice: ₹${formatPrice(itemPrice)} each`;
                      message += `%0ASubtotal: ₹${formatPrice(itemPrice * item.quantity)}`;
                      message += "%0A%0A";
                    });
                    
                    // Add total
                    message += `Total Order Value: ₹${formatPrice(cartTotal)}`;
                    
                    // Create WhatsApp URL
                    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
                    
                    // Open WhatsApp in a new tab
                    window.open(whatsappUrl, '_blank');
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    backgroundColor: 'var(--color-primary-600)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    marginBottom: '8px'
                  }}
                >
                  Checkout via WhatsApp
                </button>
                
                <button
                  onClick={toggleCart}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    backgroundColor: 'white',
                    color: '#4B5563',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartIcon;

