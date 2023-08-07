import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import closebutton from '../../assets/images/closebutton.svg'
import plusbutton from '../../assets/images/plus.svg'
import minusbutton from '../../assets/images/minus.svg'
const CartItem = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const handleAddToCart = () => {
    addToCart(product);
  }
  return (
    <><hr className="my-4" /><div className="row mb-4 d-flex justify-content-between align-items-center">
          <div className="col-md-2 col-lg-2 col-xl-2">
              <img
                  src={product.imageUrl}
                  className="img-fluid rounded-3" alt="Cotton T-shirt" />
          </div>
          <div className="col-md-3 col-lg-3 col-xl-3">
              <h6 className="text-muted">Shirt</h6>
              <h6 className="text-black mb-0">{product.name}</h6>
          </div>
          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button className="btn btn-link px-2">
              <img src={minusbutton} alt="minusquantity" width={15} height={15}/> 
              </button>

              <input id="form1" min="1" name="quantity" value="1" type="number"
                  className="form-control form-control-sm" />

              <button className="btn btn-link px-2">
              <img src={plusbutton} alt="plusquantity" width={15} height={15}/> 
              </button>
          </div>
          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h6 className="mb-0">{product.price.toFixed(2)}€</h6>
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1 text-end">
            <button style={{border: 'none', background: 'transparent'}} > <img src={closebutton} alt="removeitem" width={15} height={15}/> </button>
          </div>
      </div></>
  );
};

export default CartItem;
