import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { CartContext, CartProvider } from './components/Context/CartContext';
import { AuthProvider } from './authContext/AuthProvider';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <AuthProvider>
<CartProvider>
  <Layout>
  <AppRoutes/>
  </Layout>
  </CartProvider>
  </AuthProvider>
  );
}

export default App;
