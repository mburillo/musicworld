import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import closebutton from '../../../assets/images/closebutton.svg';
const PaymentItems = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const handleQuantityChange = (e, product) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      addToCart(product, newQuantity - product.quantity);
    }
  };
  return (
    <div class="col-lg-8">
      <p class="pb-2 fw-bold">Order</p>
      <div class="card">
        <div>
          <div class="table-responsive px-md-4 px-2 pt-3">
    <table className="table table-borderless">
      <tbody>
        {cartItems.map((item, index) => (
          <tr key={index} className="border-bottom">
            <td>
              <div className="d-flex align-items-center">
                <div>
                  <img className="picc img-fluid rounded-3" src={item.imageUrl[0]}  alt={item.name} width={200} height={200} />
                </div>
                <div className="ps-3 d-flex flex-column">
                  <p className="fw-bold">{item.name}</p>
                  <p className='fw-nold'>{item.type}</p>
                  {item.type === 'T-SHIRT' && (
                    <>
                      <small className="d-flex">
                        <span className="text-muted">Color:</span>
                        <span className="fw-bold">{item.color}</span>
                      </small>
                      <small>
                        <span className="text-muted">Size:</span>
                        <span className="fw-bold">{item.size}</span>
                      </small>
                    </>
                  )}
                </div>
              </div>
            </td>
            <td style={{ height: '80px', width: '160px', textAlign: 'center', verticalAlign: 'middle' }}>
              <div className="d-flex align-items-center">
                <div className="ps-3 d-flex flex-column">
                  <p className="pe-3"><span className="red">{item.price}€</span></p>
                </div>
              </div>
            </td>
            <td style={{ height: '80px', width: '160px', textAlign: 'center', verticalAlign: 'middle' }}>
              <div className="d-flex align-items-center">
                <span className="pe-3 text-muted">Quantity</span>
                <span className="pe-3">   <input
                    className="ps-2"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(e, item)}
                  /></span>
                 <div className="round">
                 <button onClick={() => removeFromCart(item.id)} style={{border: 'none', background: 'transparent'}} >
                 <img src={closebutton} alt="closingbutton" width={30} height={30}/>
                 </button>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
    </div>
  );
};

export default PaymentItems;
