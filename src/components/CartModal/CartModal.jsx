import React, { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import closebutton from '../../assets/images/closebutton.svg'
function CartModal({ show, onClose }) {
    const { cartItems } = useContext(CartContext);
    if (!show) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 80,
            right: 0,
            height: '100%',
            width: '500px',
            backgroundColor: 'white',
            zIndex: 1000,
            overflowY: 'auto',
            padding: '20px',
            boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.3)'
        }}>

<button onClick={onClose} style={{border: 'none', background: 'transparent'}}>
  <img src={closebutton} alt="closingbutton" width={30} height={30}/>
</button>

            <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                    <h6 className="mb-0 text-muted">{cartItems.length} items</h6>
                </div>
            </div>
            {cartItems.map(item => (
                <CartItem key={item.id} product={item} />
            ))}
        </div>
    );
}

export default CartModal;