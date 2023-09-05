import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import CartModal from '../CartModal/CartModal';

const Layout = ({ children }) => {
    const { showModal, setShowModal } = useContext(CartContext);

    return (
        <>
            {children}
            <CartModal show={showModal} onClose={() => setShowModal(false)} />
        </>
    );
}

export default Layout;
