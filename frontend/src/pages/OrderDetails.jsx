// frontend/src/pages/OrderDetails.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import axios from 'axios';
import './OrderDetails.css';

const OrderDetails = () => {
    const { containerId } = useParams();
    const [container, setContainer] = useState(null);
    const [orderSize, setOrderSize] = useState('');
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        const fetchContainerDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/api/exporter/container/${containerId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setContainer(response.data);
            } catch (error) {
                console.error('Error fetching container details:', error);
            }
        };
        fetchContainerDetails();
    }, [containerId]);

    const handleOrderSubmit = () => {
        // Navigate to Payment page with order details
        navigate('/payment', { state: { containerId, orderSize } });
    };

    if (!container) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-details">
            <h1>Order Details for Container ID: {container._id}</h1>
            <p>Available Space: {container.availableSpace}</p>
            <p>Pickup Date: {new Date(container.pickupDate).toLocaleDateString()}</p>
            <p>Price: {container.price}</p>
            {/* Add more container details if needed */}

            <input
                type="number"
                placeholder="Order Size"
                value={orderSize}
                onChange={(e) => setOrderSize(e.target.value)}
            />
            <button onClick={handleOrderSubmit}>Proceed to Payment</button>
        </div>
    );
};

export default OrderDetails;