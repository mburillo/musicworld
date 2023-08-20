import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './ProductList.css';
const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  return (
    <div key={product} className="col-md-4 mb-4">
    <div className="card">
    <Link to={`/product/${product.id}`} style={{ display: 'block', textAlign: 'center' }}>
    <img src={product.imageUrl[0]} alt={product.name} className="card-img-top" />
</Link>


        <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">${product.price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={handleAddToCart}>Añadir al carrito</button>
        </div>
    </div>
</div>
  );
};

export default Product;
