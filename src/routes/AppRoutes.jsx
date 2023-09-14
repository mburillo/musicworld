import { HashRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
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
import CartModal from '../components/CartModal/CartModal';
import { CartContext } from '../components/Context/CartContext';
import Payment from '../components/Payment/Payment';
import Layout from '../components/Layout/Layout';
import ProcessPayment from '../components/ProcessPayment/ProcessPayment';
import CDList from '../components/ProductList/CDList/CDList';
import VinylList from '../components/ProductList/VinylList/VinylList';
import ShirtList from '../components/ProductList/ShirtList/ShirtList';
import SendToPasswordUpdate from '../components/SendToPasswordUpdate/SendToPasswordUpdate';
import UpdatePassword from '../components/UpdatePassword/UpdatePassword';
export const AppRoutes = () => {
    return (
        <HashRouter>
            <div>
                <Layout>
                <NavigationBar />
                <Routes>
                    <Route path='/' element={<ProductList />} />    
                    <Route path='/profile' element={<UserProfile/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path='/send-to-password-update'element={<SendToPasswordUpdate/>} />
                    <Route path='/update-password' element={<UpdatePassword/>}/>
                    <Route path="recover-password" element={<RecoverPassword/>}/>
                    <Route path="/product/:id" element={<ProductView/>} />
                    <Route path="/payment" element={<Payment/>}/>
                    <Route path="/process-payment" element={<ProcessPayment/>}/>
                    <Route path="/cds" element={<CDList/>}/>
                    <Route path="/vinyls" element={<VinylList/>}/>
                    <Route path="/shirts" element={<ShirtList/>}/>
                </Routes>
                <CartModal />
                <Footer/>
                </Layout>
            </div>    
        </HashRouter>
    );
};
