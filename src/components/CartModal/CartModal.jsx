import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import CartItem from '../CartItem/CartItem';
import closebutton from '../../assets/images/closebutton.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthProvider';
import { Link } from 'react-router-dom';

function CartModal({ show, onClose }) {
    const { cartItems, getTotalPrice } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const totalPrice = getTotalPrice();

    if (!show) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 80,
            right: 0,
            height: 'calc(100% - 80px)',
            width: '500px',
            backgroundColor: 'white',
            zIndex: 1000,
            overflow: 'hidden',
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
            
            <div style={{
                overflowY: 'auto',
                height: 'calc(100% - 180px)', 
            }}>
                {cartItems.map(item => (
                    <CartItem key={item.id} product={item} />
                ))}
            </div>

            <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                width: '500px',
                padding: '20px',
                backgroundColor: 'white',
                borderTop: '1px solid black',
            }}>
                <h2>Total: {totalPrice.toFixed(2)}€</h2>
                <Link 
    to={isAuthenticated ? '/payment' : '/login'} 
    className="btn btn-primary"
>
    Pagar
</Link>
            </div>
        </div>
    );
}

export default CartModal;
