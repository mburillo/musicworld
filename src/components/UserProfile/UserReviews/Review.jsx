import React from 'react';
import usericon from '../../../assets/images/usericon.svg'
const Review = ({ review }) => (
    <div className="col-12 mb-4">
        <div className="d-flex">
            <div>
                <img src={usericon} alt="Avatar del usuario" className="rounded-circle" style={{ width: '80px', height: '80px' }} />
            </div>
            <div className="ms-3">
                <h5>{review.user.firstName} {review.user.lastName}  {[...Array(5)].map((star, i) => (
                        <i key={i} className={`fa fa-star ${i < review.rating ? 'text-warning' : 'text-muted'}`}></i>
                    ))}</h5>
                <p className="mt-2">{review.comment}</p>
            </div>
        </div>
    </div>
);

export default Review;
