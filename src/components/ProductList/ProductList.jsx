import React, { useState, useEffect, useContext, useRef } from 'react';
import Product from './Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductList.css';
import { CartContext } from '../Context/CartContext';
import axios from 'axios';
import BigCarousel from './BigCarousel/BigCarousel';
import SmallCarousel from './SmallCarousel/SmallCarousel';
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
function ProductList() {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [products, setProducts] = useState([]);
    const { setCartItems } = useContext(CartContext);
    const [hasMore, setHasMore] = useState(true);
    const [latestProductsCarousel, setLatestProductsCarousel] = useState([]);
    const latestCarouselLimit = 15;
    const [mostSoldProducts, setMostSoldProducts] = useState([]);
    const mostProductsCarouselLimit = 15;
    const [carouselData, setCarouselData] = useState([]);
    const [limit, setLimit] = useState(5);
    const [filters, setFilters] = useState({
        searchText: "",
        minPrice: null,
        maxPrice: null
    });
    const currentPageRef = useRef(1);
    const [toasts, setToasts] = useState([]);

    const handleShowToast = (message) => {
        const newToast = {
            id: new Date().getTime(),
            message: message
        };
        setToasts([...toasts, newToast]);
    
        setTimeout(() => {
            setToasts(toasts => toasts.filter(t => t.id !== newToast.id));
        }, 3000);
    };
    const removeToast = (toastId) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== toastId));
    };
    
    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/promotional-images?limit=${limit}`);
                setCarouselData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCarouselData();
    }, [limit]);
    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };
    const loadMore = async () => {
        try {
            const pageToLoad = currentPageRef.current;
            const response = await axios.get(`${API_BASE_URL}/api/products`, {
                params: {
                    page: pageToLoad,
                    limit: 6,
                    ...filters
                }
            });
            const newData = response.data.filter(
                newProduct => !products.some(product => product.id === newProduct.id)
            );
            setProducts(prevProducts => {
                const updatedProducts = [...prevProducts, ...newData];
                return updatedProducts;
            });
            console.log(products)
            if (response.data.length < 6) {
                setHasMore(false);
            }
            currentPageRef.current += 1;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/latest-products?limit=${latestCarouselLimit}`);
                setLatestProductsCarousel(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCarouselData();
    }, [latestCarouselLimit]);

    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/most-sold-products?limit=${mostProductsCarouselLimit}`);
                setMostSoldProducts(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCarouselData();
    }, [mostProductsCarouselLimit]);



    const updateFilter = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    };

    useEffect(() => {
        const debouncedFetchProducts = debounce(async () => {
            setProducts([]);
            setHasMore(true);
            currentPageRef.current = 0;

        }, 1000);
        debouncedFetchProducts();
        return () => {
            debouncedFetchProducts.cancel();
        };
    }, [filters]);

    return (
        <>
            {carouselData.length === 0 ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    <BigCarousel carouselData={carouselData} />
                    <h2 className='text-center mt-5'>Our latest products</h2>
                    <SmallCarousel items={latestProductsCarousel} />
                    <h2 className='text-center mt-5'>Our most sold products</h2>
                    <SmallCarousel items={mostSoldProducts} />
                    <div className="container mt-5">
                        <h2 className='text-center mb-3'>All of our products</h2>
                        <div className="filters row mb-3">
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={filters.searchText}
                                    onChange={(e) => updateFilter("searchText", e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Min Price"
                                    value={filters.minPrice || ""}
                                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Max Price"
                                    value={filters.maxPrice || ""}
                                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                                />
                            </div>
                        </div>

                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            loader={  <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100vh'
                            }}>
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                        >

                            <div className="row">
                                {products.map((product) => (
                                    <Product key={product.id} product={product} addToCart={addToCart} handleShowToast={handleShowToast} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </>
            )}
<div className="toast-container position-fixed bottom-0 end-0 p-3">
    {toasts.map(toast => (
        <div key={toast.id} className="toast show">
            <div className="toast-header">
                <strong className="me-auto">Notification</strong>
                <button type="button" className="btn-close" onClick={() => removeToast(toast.id)}></button>
            </div>
            <div className="toast-body">
                Your item has been added to the cart!
            </div>
        </div>
    ))}
</div>
        </>
    );
}

export default ProductList;
