import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import UseProtectedRoute from '../../routes/UseProtectedRoute';
import usericon from '../../assets/images/usericon.svg';
import UserOrders from './UserOrders/UserOrders';
import UserReviews from './UserReviews/UserReviews';
import UserSettings from './UserSettings/UserSettings';
import AddProducts from './AddProducts/AddProducts';
function UserProfile() {
    UseProtectedRoute();

    const [user, setUser] = useState(null);
    const [view, setView] = useState('orders');
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                console.log(token)
                const config = {
                    headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                      "Authorization": 'Bearer '+ token
                    }
                  };
                console.log(`Authorization header: Bearer ${token}`);
                const response = await axios.get('https://musicworld.onrender.com/api/user/profile', config);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);
    const renderView = () => {
        switch(view) {
            case 'orders':
                return <UserOrders />;
            case 'reviews':
                return <UserReviews />;
            case 'settings':
                return <UserSettings />;
            case 'add-product':
                return <AddProducts />;
            default:
                return <UserOrders />;
        }
    };
    if (!user) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <img src={usericon} alt="User Profile" className="img-fluid rounded-circle mb-3" style={{width: '150px', height: '150px'}} />
                    <h2>{user.firstName} {user.lastName}</h2>
                </div>
            </div>
   
            <div className="row mt-5">
                <div className="col-md-12">
                    <ul className="list-group list-group-horizontal justify-content-center">
                        <li className="list-group-item flex-fill text-center"><a href="#" onClick={() => setView('orders')}>Ver Pedidos</a></li>
                        <li className="list-group-item flex-fill text-center"><a href="#" onClick={() => setView('reviews')}>Ver Reseñas</a></li>
                        <li className="list-group-item flex-fill text-center"><a href="#" onClick={() => setView('settings')}>Configuración</a></li>
                        {user.admin && <li className="list-group-item flex-fill text-center"><a href="#" onClick={() => setView('add-product')}>Añadir Productos</a></li>}
                    </ul>
                </div>
                <div className="col-md-12 mt-4">
                    {renderView()}
                </div>
            </div>
        </div>
    );
    
}

export default UserProfile;
