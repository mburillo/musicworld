import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductList from '../components/ProductList/ProductList';
import NavigationBar from '../components/NavigationBar/NavigationBar';
import Footer from '../components/Footer/Footer';
export const AppRoutes = () => {
	return (
		<BrowserRouter>
      <div>
        <NavigationBar />
		<Routes>
			<Route path='/' element={<ProductList />} />	
			</Routes>
			<Footer/>
			</div>	
		</BrowserRouter>
	);
};