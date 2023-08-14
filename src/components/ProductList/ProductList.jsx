import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const { cartItems, setCartItems } = useContext(CartContext);
    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
      };
      const [page, setPage] = useState(1);

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products?page=${page}&limit=6`);
                setProducts(prevProducts => [...prevProducts, ...response.data]);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchData();
    }, [page]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                setPage(prevPage => prevPage + 1);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
