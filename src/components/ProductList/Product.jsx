import { useContext, useState } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './ProductList.css';
import './Product.css';

const Product = ({ product, handleShowToast }) => {
    const { addToCart } = useContext(CartContext);
    const [selectedSize, setSelectedSize] = useState(null);
    const handleAddToCart = () => {
        if (product.type === 'SHIRT') {
            addToCart(product, selectedSize, 1);
        } else {
            addToCart(product);
        }
        handleShowToast();
    };
    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
      };
    return (
        <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
                <Link to={`/product/${product.id}`} className="text-center">
                    <img src={product.imageUrl[0]} alt={product.name} className="card-img-top" />
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{product.name} {(product.type === 'CD' || product.type === 'VINYL') && `(${product.releaseYear})`}</h5>
                    <div className="d-flex justify-content-between">
                        {(product.type === 'CD' || product.type === 'VINYL') && (
                            <>
                                <p className="mb-0"><b>Genre:</b> {product.genre}</p>
                                <p className="mb-3"><b>Author:</b> {product.author}</p>
                            </>
                        )}
                    </div>
                    {product.type === 'SHIRT' && (
                        <p className='mb-3'><b>Color:</b> {product.color}</p>
                    )}
                    <p className="card-text">{product.description}</p>
                    <p className="card-text mb-3">${product.price.toFixed(2)}</p>
                    {product.type === 'SHIRT' && (
                        <div className="size-container d-flex flex-column align-items-center mb-3">
                            <p><b>Available sizes</b></p>
                            <select name="size" id="size" className="mr-2" onChange={handleSizeChange}>
                                {product.size.map((size, index) => (
                                    <option key={index} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="d-flex justify-content-center">
                        <button className="btn btn-primary" onClick={handleAddToCart}>Add to cart</button>
                    </div>
                   
                </div>
            </div>
        </div>
        
    );
};

export default Product;
