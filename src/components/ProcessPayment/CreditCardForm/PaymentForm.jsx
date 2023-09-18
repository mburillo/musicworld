import React, { useState } from 'react';

const PaymentForm = ({ cardInfo, setCardInfo }) => {
  const handleInputChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setCardInfo({
        ...cardInfo,
        [name]: value
      });
    }
  };

  const handleExpiryChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 5) {
      if (value.length === 2 && !value.includes('/')) {
        setCardInfo({
          ...cardInfo,
          [name]: value + '/'
        });
      } else {
        setCardInfo({
          ...cardInfo,
          [name]: value
        });
      }
    }
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 3) {
      setCardInfo({
        ...cardInfo,
        cardCVV: numericValue
      });
    }
  };
  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 16) {
      setCardInfo({
        ...cardInfo,
        cardNumber: numericValue
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Payment Information</h2>
        <div className="mb-3">
          <label htmlFor="cardName" className="form-label">Cardholder Name</label>
          <input type="text" className="form-control" id="cardName" name="cardName" onChange={(e) => handleInputChange(e, 100)} />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input type="text" className="form-control" id="cardNumber" name="cardNumber" value={cardInfo.cardNumber} onChange={handleCardNumberChange} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cardExpiry" className="form-label">Expiry Date</label>
            <input type="text" className="form-control" id="cardExpiry" name="cardExpiry" value={cardInfo.cardExpiry} onChange={handleExpiryChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cardCVV" className="form-label">CVV</label>
            <input type="text" className="form-control" id="cardCVV" name="cardCVV" value={cardInfo.cardCVV} onChange={handleCVVChange} />
          </div>
        </div>
        <div className="text-center">
        <p className="mt-3">Note: The credit card information will not be stored. You can use fake credit card information.</p>
</div>
    </div>
  );
};

export default PaymentForm;
