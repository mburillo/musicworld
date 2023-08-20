import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';

function UserReviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const userToken = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:8080/api/user/reviews', {
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
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Mis Reviews</h3>
            <div className="row">
                {reviews.map((review, index) => (
                    <Review key={index} review={review} />
                ))}
            </div>
        </div>
    );
}

export default UserReviews;
