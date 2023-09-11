import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { Link } from 'react-router-dom';
import './Payment.css';
import PaymentItems from './PaymentItems/PaymentItems';
import PaymentSummary from './PaymentSummary/PaymentSummary';
const Payment = () => {

  return (
    <div class="container mt-4 p-0">
      <div class="row px-md-4 px-2 pt-4">
              <PaymentItems/>
              <PaymentSummary/>
      </div>
    </div>
  );
};

export default Payment;
