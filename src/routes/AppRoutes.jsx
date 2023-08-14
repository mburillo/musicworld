import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductList from '../components/ProductList/ProductList';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
import Login from '../components/Login/Login'
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import Register from '../components/Register/Register';
import VerifyEmail from '../components/VerifyEmail/VerifyEmail';
import RecoverPassword from '../components/RecoverPassword/RecoverPassword';
import UserProfile from '../components/UserProfile/UserProfile';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<ProductList />} />    
                    <ProtectedRoute path='/profile' element={<UserProfile/>}/>
                    <GuestRoute path='/login' element={<Login/>}/>
                    <GuestRoute path='/forgot-password' element={<ForgotPassword/>}/>
                    <GuestRoute path='/register' element={<Register/>}/>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="recover-password" element={<RecoverPassword/>}/>
                </Routes>
                <Footer/>
            </div>    
        </BrowserRouter>
    );
};