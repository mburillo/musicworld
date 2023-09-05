import React, { useState, useEffect, useContext } from 'react';
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';
function ProductList() {
    console.log("ProductList montado");
    const [products, setProducts] = useState([]);
    const { setCartItems } = useContext(CartContext);
    const [hasMore, setHasMore] = useState(true);
    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
      };
      const [page, setPage] = useState(0);


      useEffect(() => { 
        const fetchData = async () => {
            if (hasMore && (!products.length || page > 0)) { 
                try {
                    const response = await axios.get(`https://musicworldspring-production.up.railway.app/api/products?page=${page}&limit=6`
                      );
                    const newData = response.data.filter(
                        newProduct => !products.some(product => product.id === newProduct.id)
                    );
    
                    if (response.data.length < 6) { // Si obtenemos menos de 6 productos, probablemente no haya más.
                        setHasMore(false);
                    }
    
                    setProducts(currentProducts => [...currentProducts, ...newData]);
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
            }
        };
        fetchData();
    }, [page, products]);
    
    useEffect(() => {
        const handleScroll = () => {
            if (hasMore && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                setPage(prevPage => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]); 
    
    return (
        <div className="container mt-5">
            <div className="row">
            {products.map((product) => (
   <Product key={product.id} product={product} addToCart={addToCart} />
))}
            </div>
        </div>
    );
}

export default ProductList;
 