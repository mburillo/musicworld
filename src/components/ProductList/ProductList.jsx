// src/components/ProductList.js

import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';
import { CartContext } from '../Context/CartContext';

function ProductList() {
    const [products, setProducts] = useState([]);
    const { cartItems, setCartItems } = useContext(CartContext);
    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
      };
    useEffect(() => {
        fetch('http://localhost:8080/api/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                {products.map((product, index) => (
                     <Product key={index} product={product} addToCart={addToCart} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
