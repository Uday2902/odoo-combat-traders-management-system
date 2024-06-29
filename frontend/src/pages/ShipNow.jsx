// frontend/src/pages/ShipNow.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import './ShipNow.css';
import Header from './Header';

const ShipNow = () => {
    const [containers, setContainers] = useState([]);
    const [filters, setFilters] = useState({ size: 0, date: Date.now(), priceRange: '' });
    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/getContainers');
                setContainers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContainers();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleOrderSubmit = (containerId, orderSize) => {
        navigate('/payment', { state: { containerId, orderSize } });
    };

    const filteredContainers = containers.filter(container => {
        let price = filters.priceRange;
        if(filters.priceRange === ''){
            price = 10000000000
        }
        return (
            (filters.size ? container.availableSpace >= parseInt(filters.size) : true) &&
            (filters.date ? new Date(container.pickupDate).toDateString() <= new Date(filters.date).toDateString() : true) &&
            (filters.priceRange ? container.price <= price : true)
        );
    });

    return (
        <div className="ship-now">
            <Header />
            <h1>Ship Now</h1>
            <div className="filters">
                <input
                    type="number"
                    name="size"
                    placeholder="Size"
                    value={filters.size}
                    onChange={handleFilterChange}
                />
                <input
                    type="date"
                    name="date"
                    placeholder="Pickup Date"
                    value={filters.date}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="priceRange"
                    placeholder="Price Range"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                />
            </div>
            <div className="container-list">
                {filteredContainers.map(container => (
                    <div 
                        key={container._id} 
                        className="container"
                    >
                        {/* <p>Container ID: {container._id}</p> */}
                        <p>Available Space: {container.availableSpace}</p>
                        <p>Pickup Date: {new Date(container.pickupDate).toLocaleDateString()}</p>
                        <p>Price: {container.price}</p>
                        <p></p>
                        <button onClick={() => handleOrderSubmit(container._id, filters.size)} >Ship now</button>
                        {/* Display other container details here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShipNow;