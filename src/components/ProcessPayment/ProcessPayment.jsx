import React, { useState, useContext } from 'react';
import AddressForm from './AddressForm/AddressForm';
import { useLocation } from 'react-router-dom';
import PaymentForm from './CreditCardForm/PaymentForm';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';
import UseProtectedRoute from '../../routes/UseProtectedRoute';
const ProcessPayment = () => {
    UseProtectedRoute();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    const [addressInfo, setAddressInfo] = useState({});
    const [saveAddress, setSaveAddress] = useState(false);
    const { cartItems } = useContext(CartContext);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const location = useLocation();
    const { finalAmount, additionalCosts } = location.state || {};
    const [cardInfo, setCardInfo] = useState({
        cardName: '',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    });

    const [errors, setErrors] = useState({});

    const validatePaymentForm = () => {
        let formErrors = {};
        if (!cardInfo.cardName) {
            formErrors.cardName = 'Cardholder name cannot be empty';
        }
        if (cardInfo.cardNumber.length !== 16) {
            formErrors.cardNumber = 'Card number must have 16 digits';
        }
        const expiryArray = cardInfo.cardExpiry.split('/');
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear() % 100;
        if (expiryArray.length !== 2 || expiryArray[0].length !== 2 || expiryArray[1].length !== 2) {
            formErrors.cardExpiry = 'Expiry date is incorrect';
        } else {
            const expiryMonth = parseInt(expiryArray[0], 10);
            const expiryYear = parseInt(expiryArray[1], 10);
            if (expiryMonth > 12 || expiryMonth < 1) {
                formErrors.cardExpiry = 'Expiry month must be between 1 and 12';
            } else if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                formErrors.cardExpiry = 'Expiry date has passed';
            }
        }
        if (cardInfo.cardCVV.length !== 3) {
            formErrors.cardCVV = 'CVV must have 3 digits';
        }
        return formErrors;
    };

    const validateAddressForm = () => {
        let addressErrors = {};
        if (!addressInfo.country) {
            addressErrors.country = 'Country cannot be empty';
        }
        if (!addressInfo.city) {
            addressErrors.city = 'City cannot be empty';
        }
        if (!addressInfo.province) {
            addressErrors.province = 'Province cannot be empty';
        }
        if (!addressInfo.street) {
            addressErrors.street = 'Street Address cannot be empty';
        }
        if (!addressInfo.postalCode) {
            addressErrors.postalCode = 'Postal Code cannot be empty';
        }
        return addressErrors;
    };

    const handlePayment = async (event) => {
        const paymentErrors = validatePaymentForm();
        const addressErrors = validateAddressForm();
        const allErrors = { ...paymentErrors, ...addressErrors };
        setErrors(allErrors);
    
        if (Object.keys(allErrors).length === 0) {
            try {
                if (saveAddress) {
                    await saveAddressToDatabase(addressInfo);
                }
                const paymentResult = await processPayment(cardInfo);
                if (paymentResult.success) {
                    setConfirmationMessage("Your order has been processed succesfully!");
                    setAddressInfo({});
                    setCardInfo({
                        cardName: '',
                        cardNumber: '',
                        cardExpiry: '',
                        cardCVV: ''
                    });
                    setSaveAddress(false);
                } else {
                    setConfirmationMessage("Your order could not be processed. Please try again.");
                }
            } catch (error) {
                console.error("Error", error);
                setConfirmationMessage("An error occured while processing your order. Please try again");
            }
        }
    };
    
    const saveAddressToDatabase = async (address) => {
        const token = localStorage.getItem("authToken");
        console.log(token)
        const config = {
            headers: {
              "Authorization": 'Bearer '+ token
            }
          };
          try {
            const response = await axios.post(`${API_BASE_URL}/api/user/save-address`, address, config);
            if (response.status === 200) {

            }
        } catch (error) {

        }
    };
    
    const processPayment = async (cardInfo) => {
        const token = localStorage.getItem("authToken");
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        const paymentData = {
            addressInfo,
            cartItems,
            finalAmount,
            additionalCosts
        };
        try {
            const response = await axios.post(`${API_BASE_URL}/api/payment/process`, paymentData, config);
            if (response.status === 200 && response.data) {
                return { success: true };
            } else {
                return { success: false };
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            return { success: false };
        }
    };

    return (
        <div className="container mt-5">
            <h1 className='text-center'>Checkout</h1>
            <AddressForm
                addressInfo={addressInfo}
                setAddressInfo={setAddressInfo}
            />
            <div className="mb-3 form-check">
    <input
        type="checkbox"
        className="form-check-input"
        id="saveAddress"
        checked={saveAddress}
        onChange={(e) => setSaveAddress(e.target.checked)}
    />
    <label className="form-check-label" htmlFor="saveAddress">Remember this shipping information?</label>
</div>
            <PaymentForm cardInfo={cardInfo} setCardInfo={setCardInfo} />
            <div className="text-center">
                <button type="submit" className="btn btn-primary mb-3" onClick={handlePayment}>Submit</button>
            </div>
            {confirmationMessage && (
            <div className="alert alert-info mt-3">
                {confirmationMessage}
            </div>
        )}
        
        {Object.keys(errors).map((key, index) => (
            <div key={index} className="alert alert-danger mt-3">
                {errors[key]}
            </div>
        ))}
    </div>
    );
};

export default ProcessPayment;
