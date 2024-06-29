// frontend/src/pages/AddContainer.js

import React, { useState } from 'react';
import axios from 'axios';
import './AddContainer.css';

const AddContainer = () => {
    const [formData, setFormData] = useState({
        containerPickupAddress: '',
        containerDestinationAddress: '',
        containerPath: '',
        availableSpace: '',
        price: '',
        pickupDate: '',
        pickupTime: '',
        expectedDeliveryDate: '',
        expectedDeliveryTime: '',
        timeToReachForPickup: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            await axios.post('http://localhost:5000/api/shipper/containers', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.href = '/shipper-dashboard';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="add-container">
            <h1>Add Container</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="containerPickupAddress"
                    placeholder="Pickup Address"
                    value={formData.containerPickupAddress}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="containerDestinationAddress"
                    placeholder="Destination Address"
                    value={formData.containerDestinationAddress}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="containerPath"
                    placeholder="Path"
                    value={formData.containerPath}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="availableSpace"
                    placeholder="Available Space"
                    value={formData.availableSpace}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="pickupDate"
                    placeholder="Pickup Date"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="pickupTime"
                    placeholder="Pickup Time"
                    value={formData.pickupTime}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="expectedDeliveryDate"
                    placeholder="Expected Delivery Date"
                    value={formData.expectedDeliveryDate}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="time"
                    name="expectedDeliveryTime"
                    placeholder="Expected Delivery Time"
                    value={formData.expectedDeliveryTime}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="timeToReachForPickup"
                    placeholder="Time to Reach for Pickup"
                    value={formData.timeToReachForPickup}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Container</button>
            </form>
        </div>
    );
};

export default AddContainer;