import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = ({ isOpen, onClose,onPaymentSuccess }) => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true);
    onPaymentSuccess();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Payment Modal"
      ariaHideApp={false}
      className="modal-dialog modal-dialog-centered mx-4 bg-light p-3 shadow border rounded "
     
      overlayClassName="position-absolute start-0 top-0 w-100 vh-100 d-flex justify-content-center align-items-center"
      
    >
      <div className="modal-content">
        <div className="modal-header d-flex  justify-content-between align-items-center ">
          <h5 className="modal-title">Payment</h5>
          <button type="button" className="close border-0  rounded bg-danger text-light" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {paymentSuccessful ? (
            <div>
              <h4>Payment is successful!</h4>
            </div>
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center '>
              <h4>Scan the QR code to pay</h4>
              <QRCode value="sakalagowda123@okicici" size={256} />
              <button className="btn btn-success mt-3" onClick={handlePaymentSuccess}>
                Simulate Payment Success
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Payment;
