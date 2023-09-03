import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductView.css';
import { CartContext } from '../Context/CartContext';
import { Carousel } from 'react-bootstrap';
import Review from '../UserProfile/UserReviews/Review';
function ProductView() {
    const carouselContainerStyle = {
        height: '400px',
        overflow: 'hidden'
    };

    const carouselImageStyle = {
        maxHeight: '100%',
        width: 'auto',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    };
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useContext(CartContext);
    const [reviews, setReviews] = useState([]);
    const [reviewPage, setReviewPage] = useState(0);
    const [newReview, setNewReview] = useState('');
    const [rating, setRating] = useState(0);
    const [sortOption, setSortOption] = useState('best');
    const [hasMoreReviews, setHasMoreReviews] = useState(true);

    const handleAddToCart = () => {
        const essentialProductData = {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        };
        addToCart(essentialProductData);
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://musicworldspring-production.up.railway.app/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);



    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://musicworldspring-production.up.railway.app/api/reviews/${id}?page=${reviewPage}&size=20&sort=${sortOption}`);

            if (response.data.length < 20) {
                setHasMoreReviews(false);
            }

            if (reviewPage > 0) {
                setReviews(prevReviews => [...prevReviews, ...response.data]);
            } else {
                setReviews(response.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };
    const handleLoadMoreReviews = () => {
        setReviewPage(prevPage => prevPage + 1);
        fetchReviews();
    };

    const handleNewReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleAddReview = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.post('https://musicworldspring-production.up.railway.app/api/reviews', { content: newReview, rating: rating, productId: id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setNewReview('');
            setReviewPage(0);
            fetchReviews();
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    useEffect(() => {

        fetchReviews(); // Cargar las reviews iniciales
    }, [id, reviewPage]);
    const handleStarClick = (index) => {
        setRating(index + 1);
    };
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setReviewPage(0);
        setReviews([]);
    };

    useEffect(() => {
        fetchReviews();
    }, [sortOption, reviewPage]);

    useEffect(() => {
        const handleScroll = () => {
            if (hasMoreReviews && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                setReviewPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMoreReviews]);

    if (!product) return <div className="text-center mt-5">Loading...</div>;
    return (
        <><div className="product container mt-5">
            <div className="row">
                <div className="col-md-2"></div> {/* Columna vacía como espaciador */}

                <div className="col-md-5">
                    <Carousel controls={product.imageUrl.length > 1}>
                        {product.imageUrl.map((image, index) => (
                            <Carousel.Item key={index} style={carouselContainerStyle}>
                                <img src={image} alt={`${product.name}`} style={carouselImageStyle} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className="col-md-5">
                    <h2>{product.name}</h2>
                    <p>Type: {product.type}</p>
                    <p>{product.description}</p>
                    <p>Price: ${product.price.toFixed(2)}</p>

                    {product.type === "SHIRT" && (
                        <div className="mt-2">
                            <label>Size:
                                <select className="ml-2">
                                    {product.size.map((size, index) => (
                                        <option key={index} value={size}>{size}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}

                    <div className="mt-3">
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                    </div>

                </div>
                <div className="add-review-form mt-4">
                    <h4>Add Your Review</h4>

                    <textarea className="form-control mb-3" rows="4" value={newReview} onChange={handleNewReviewChange} placeholder="Your review..."></textarea>

                    {/* Componente de selección de estrellas */}
                    <div className="mb-3">
                        {[...Array(5)].map((star, i) => (
                            <i key={i} className={`fa fa-star ${i < rating ? 'text-warning' : 'text-muted'}`} onClick={() => handleStarClick(i)} style={{ cursor: 'pointer' }}></i>
                        ))}
                    </div>

                    <button className="btn btn-primary" onClick={handleAddReview}>Add Review</button>
                </div>

                <div className="reviews-section mt-5">
                    <h3>Reviews</h3>
                    <div className="sort-options mt-5">
                        <label>Sort by: </label>
                        <select onChange={handleSortChange} value={sortOption}>
                            <option value="best">Best Reviews</option>
                            <option value="worst">Worst Reviews</option>
                            <option value="newest">Most Recent</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    {reviews.map((review, index) => (
                        <Review key={index} review={review} />
                    ))}

                </div>
            </div>
        </div>
        </>
    );

}

export default ProductView;