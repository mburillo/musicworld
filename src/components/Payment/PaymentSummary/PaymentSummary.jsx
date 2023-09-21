import React, { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import AdditionalService from './AdditionalService/AdditionalService';
import { useNavigate } from 'react-router-dom';
const PaymentSummary = () => {
    const { getTotalPrice} = useContext(CartContext);
    const [additionalCosts, setAdditionalCosts] = useState({});
    const totalPrice = getTotalPrice();
    const shippingCost = totalPrice >= 25 ? 0 : 5;
    const totalAdditionalCost = Object.values(additionalCosts).reduce((acc, val) => acc + val, 0);
    const finalAmount = totalPrice + shippingCost + totalAdditionalCost;
    const handleAdditionalCostChange = (service, newCost) => {
        setAdditionalCosts(prevCosts => ({
            ...prevCosts,
            [service]: newCost
        }));
    };

    const removeAdditionalCost = (service) => {
        setAdditionalCosts(prevCosts => {
            const newCosts = { ...prevCosts };
            delete newCosts[service];
            return newCosts;
        });
    };

    const navigate = useNavigate();

    const goToNewView = () => {
        navigate('/process-payment', { state: { finalAmount, additionalCosts } });
    };    
    return (
        <><div className="col-lg-4 payment-summary">
            <p className="fw-bold pt-lg-0 pt-4 pb-2">Payment Summary</p>
            <div className="card px-md-3 px-2 pt-4">
                <div className="d-flex justify-content-between pb-3">
                    <small className="text-muted">Transaction code</small>
                    <p>VC115665</p>
                </div>
                <div className="d-flex justify-content-between b-bottom">
                    <input type="text" className="ps-2" placeholder="COUPON CODE" />
                    <div className="btn btn-primary">Apply</div>
                </div>
                <div className="d-flex flex-column b-bottom">
                    <div className="d-flex justify-content-between py-3">
                        <small className="text-muted">Order Summary</small>
                        <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">Shipping</small>
                        <div>
                            <p>${shippingCost.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                        {shippingCost === 0 ? <p></p> : <p className='text-muted'>Free shipping if your order is worth 25€ or more</p>}
                    </div>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">Total Amount</small>
                        <p>${finalAmount.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between pb-3">
                        <button onClick={goToNewView} className="btn btn-primary">
                            Process payment
                        </button>
                    </div>
                </div>
            </div>
            <AdditionalService onCostAdd={handleAdditionalCostChange}
                onCostRemove={removeAdditionalCost} />
        </div></>
    );
};

export default PaymentSummary;
