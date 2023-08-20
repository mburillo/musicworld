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
import ProductView from '../components/ProductView/ProductView';
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<ProductList />} />    
                    <Route path='/profile' element={<UserProfile/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="recover-password" element={<RecoverPassword/>}/>
                    <Route path="/product/:id" element={<ProductView/>} />
                </Routes>
                <Footer/>
            </div>    
        </BrowserRouter>
    );
};
