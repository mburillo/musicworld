import React, { useState, useEffect, useContext, useRef } from 'react';
import Product from '../Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ProductList.css';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ReactComponent as RightArrow } from '../../../assets/images/right-arrow.svg';
import { ReactComponent as LeftArrow } from '../../../assets/images/left-arrow.svg';
import BigCarousel from '../BigCarousel/BigCarousel';
import SmallCarousel from '../SmallCarousel/SmallCarousel';
import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
function ShirtList() {
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
    const currentPageRef = useRef(1);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filters, setFilters] = useState({
        searchText: "",
        minPrice: null,
        maxPrice: null,
        color: "",
        size: ""
    });
    useEffect(() => {
        const fetchCarouselData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/promotional-images/shirts?limit=${limit}`);
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
            const response = await axios.get(`${API_BASE_URL}/api/shirts`, {
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
                const response = await axios.get(`${API_BASE_URL}/api/shirts/latest-shirts?limit=${latestCarouselLimit}`);
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
                const response = await axios.get(`${API_BASE_URL}/api/shirts/most-sold-shirts?limit=${mostProductsCarouselLimit}`);
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

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const sizeResponse = await axios.get(`${API_BASE_URL}/api/products/product-sizes`);
                const colorResponse = await axios.get(`${API_BASE_URL}/api/products/product-colors`);
                setSizes(sizeResponse.data);
                setColors(colorResponse.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProductData();
    }, []);

    
    return (
        <>
            {carouselData.length===0 ? (
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
                    <BigCarousel carouselData={carouselData}/>
                    <h2 className='text-center mt-5'>Our latest shirts</h2>
                    <SmallCarousel items={latestProductsCarousel} />
                    <h2 className='text-center mt-5'>Our most sold shirts</h2>
                    <SmallCarousel items={mostSoldProducts} />
                    <div className="container mt-5">
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
                            <div className="col">
                                <select className="form-control" value={filters.size} onChange={e => updateFilter("size", e.target.value)}>
                                    <option value="">Select a size</option>
                                    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
                                </select>
                            </div>
                            <div className="col">
                                <select className="form-control" value={filters.color} onChange={e => updateFilter("color", e.target.value)}>
                                    <option value="">Select a color</option>
                                    {colors.map(color => <option key={color} value={color}>{color}</option>)}
                                </select>
                            </div>
                        </div>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={loadMore}
                            hasMore={hasMore}
                            loader={<div className="loader" key={0}>Loading ...</div>}
                        >

                            <div className="row">
                                {products.map((product) => (
                                    <Product key={product.id} product={product} addToCart={addToCart} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    </div>
                </>
            )}
        </>
    );
    
}

export default ShirtList;
