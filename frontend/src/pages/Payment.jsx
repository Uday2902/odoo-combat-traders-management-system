// frontend/src/pages/Payment.js

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Payment.module.css'; // Import CSS module

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { containerId, orderSize } = location.state || {};
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', cvv: '' });

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handlePaymentSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/exporter/payment', { containerId, orderSize, paymentDetails }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Response", response);
            alert('Payment successful and order placed!');
            navigate('/exporter-dashboard');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
        }
    };

    if (!containerId) {
        return <div>Invalid order details.</div>;
    }

    return (
        <div className={styles.payment}> {/* Apply CSS class from module */}
            <h1>Payment</h1>
            <p>Container ID: {containerId}</p>
            <p>Order Size: {orderSize}</p>
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
            />
            <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={paymentDetails.expiryDate}
                onChange={handlePaymentChange}
            />
            <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
            />
            <button onClick={handlePaymentSubmit}>Pay</button>
        </div>
    );
};

export default Payment;
