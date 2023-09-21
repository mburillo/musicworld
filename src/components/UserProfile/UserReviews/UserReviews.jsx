import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';

function UserReviews() {
    const [reviews, setReviews] = useState([]);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const userToken = localStorage.getItem('authToken');
                const response = await axios.get(`${API_BASE_URL}/api/user/reviews`, {
                    headers: {
                        'Authorization': `Bearer ${userToken}`
                    }
                });

                setReviews(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error al obtener las reviews:", error);
            }
        };

        fetchUserReviews();
    }, [API_BASE_URL]);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">My reviews</h3>
            <div className="row">
                {reviews.map((review, index) => (
                    <Review key={index} review={review} />
                ))}
            </div>
        </div>
    );
}

export default UserReviews;
