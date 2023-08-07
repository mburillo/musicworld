import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  return (
    <div key={product} className="col-md-4 mb-4">
    <div className="card">
        <img src={product.imageUrl} alt={product.name} className="card-img-top" />
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
