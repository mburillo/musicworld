import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './UserOrders.css';
import axios from 'axios';
function UserOrders() {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`${API_BASE_URL}/api/orders/user`, config)
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [API_BASE_URL]);
    return (
        <div>
            <h3 className='text-center'>Your orders</h3>
            <ul className="order-list">
                {orders.map((order) => (
                    <li key={order.id} className="order-item">
                        <span>Order #{order.id}</span>
                        <div className="order-status">
                            <div className={`status-icon ${order.status === 'PLACED' ? 'active' : ''}`}>
                                <div className='row'>
                                    <i className="fa fa-shopping-cart"></i>
                                </div>
                                <div className='row'>
                                    <span>Placed</span>
                                </div>
                            </div>
                            <div className="status-line"></div>
                            <div className={`status-icon ${order.status === 'IN_TRANSIT' ? 'active' : ''}`}>
                                <div className='row'>
                                    <i className="fa fa-truck"></i>
                                </div>
                                <div className='row'>
                                    <span>In transit</span>
                                </div>
                            </div>
                            <div className="status-line"></div>
                            <div className={`status-icon ${order.status === 'DELIVERED' ? 'active' : ''}`}>
                                <div className='row'>
                                    <i className="fa fa-check"></i>
                                </div>
                                <div className='row'>
                                    <span>Delivered</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-products">
                        <h4 className='mt-5'>Products:</h4>
                        {order.products.map((product, index) => (
    <div key={index} className="row align-items-center mb-3">
        <div className="col-md-4 col-sm-12 d-flex align-items-center">
            <img src={product.imageUrl[0]} alt={product.name} className="img-fluid" style={{ maxWidth: '175px', marginRight: '15px' }} />
            <div>
                <span className="d-block">{product.name}</span>
                <small className="text-muted">{product.type}</small>
            </div>
        </div>
        <div className="col-md-4 col-sm-12 text-center">
            {product.type === 'CD' || product.type === 'VINYL' ? (
                <div className="text-muted">
                    <small>Year: {product.releaseYear}</small><br />
                    <small>Genre: {product.genre}</small><br />
                    <small>Artist: {product.author}</small>
                </div>
            ) : null}
            {product.type === 'SHIRT' ? (
                <div className="text-muted">
                    <small>Size: {product.size.join(', ')}</small><br />
                    <small>Color: {product.color}</small>
                </div>
            ) : null}
        </div>
        <div className="col-md-4 col-sm-12 text-md-right text-center"> 
            ${product.price}
        </div>
    </div>
))}

                    </div>
                    </li >
                ))
}
            </ul >
        </div >
    );
}

export default UserOrders;
