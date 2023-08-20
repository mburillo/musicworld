import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import closebutton from '../../assets/images/closebutton.svg'
import plusbutton from '../../assets/images/plus.svg'
import minusbutton from '../../assets/images/minus.svg'

const CartItem = ({ product }) => {
  const { removeFromCart, addToCart } = useContext(CartContext);
  
  const increaseQuantity = () => {
    addToCart(product);
  }

  const decreaseQuantity = () => {
    if(product.quantity > 1) {
      removeFromCart(product.id);
    }
  }

  const handleRemoveFromCart = () => {
    removeFromCart(product.id, product.quantity);
  };
  
  return (
    <><hr className="my-4" /><div className="row mb-4 d-flex justify-content-between align-items-center">
      <div className="col-md-2 col-lg-2 col-xl-2">
          <img src={product.imageUrl[0]} className="img-fluid rounded-3" alt="Cotton T-shirt" />
      </div>
      <div className="col-md-2 col-lg-2 col-xl-2">
          <h6 className="text-muted">{product.type}</h6>
          <h6 className="text-black mb-0">{product.name}</h6>
      </div>
      <div className="col-md-4 col-lg-4 col-xl-4 d-flex">
          <button className="btn btn-link px-2" onClick={decreaseQuantity}>
          <img src={minusbutton} alt="minusquantity" width={15} height={15}/> 
          </button>
    
          <input id="form1" min="1" name="quantity" value={product.quantity} type="number" className="form-control form-control-sm" readOnly />
    
          <button className="btn btn-link px-2" onClick={increaseQuantity}>
          <img src={plusbutton} alt="plusquantity" width={15} height={15}/> 
          </button>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 offset-lg-1">
      <h6 className="mb-0">{(product.price * product.quantity).toFixed(2)}€</h6>
      </div>
      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
        <button onClick={handleRemoveFromCart} style={{border: 'none', background: 'transparent'}} > <img src={closebutton} alt="removeitem" width={15} height={15}/> </button>
      </div>
    </div></>
  );
};

export default CartItem;
