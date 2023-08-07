import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import CartModal from '../CartModal/CartModal';

const Layout = ({ children }) => {
    const { showModal, setShowModal } = useContext(CartContext);

    return (
        <>
            {/* Aquí puedes incluir elementos comunes como la barra de navegación */}
            {children}
            <CartModal show={showModal} onClose={() => setShowModal(false)} />
            {/* Y aquí, otros elementos comunes como el pie de página */}
        </>
    );
}

export default Layout;
