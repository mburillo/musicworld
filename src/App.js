import logo from './logo.svg';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import { CartContext, CartProvider } from './components/Context/CartContext';
import Layout from './components/Layout/Layout';

function App() {
  return (
<CartProvider>
  <Layout>
  <AppRoutes/>
  </Layout>
  </CartProvider>
  );
}

export default App;
