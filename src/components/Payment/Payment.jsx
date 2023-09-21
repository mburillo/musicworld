import './Payment.css';
import PaymentItems from './PaymentItems/PaymentItems';
import PaymentSummary from './PaymentSummary/PaymentSummary';
import UseProtectedRoute from '../../routes/UseProtectedRoute';
const Payment = () => {
  UseProtectedRoute();
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
