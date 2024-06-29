// frontend/src/pages/ShipperDashboard.js

import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import './ShipperDashboard.css';

const ShipperDashboard = () => {
    const [containers, setContainers] = useState([]);
    const [activeTab, setActiveTab] = useState('available');

    useEffect(() => {
        const fetchContainers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/shipper/containers', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Containers", response.data);
                setContainers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchContainers();
    }, []);

    const filteredContainers = containers.filter(container => container.status === activeTab);

    return (
        <div className="shipper-dashboard">
            
            <div className="sections">
                <div className="shipper-details">
                    {/* Display Shipper details here */}
                </div>
                <div className="containers-section">
                    <div className="tabs">
                        <button onClick={() => setActiveTab('available')}>Available</button>
                        <button onClick={() => setActiveTab('in-transit')}>In-Transit</button>
                        <button onClick={() => setActiveTab('completed')}>Completed</button>
                    </div>
                    <div className="container-list">
                        {filteredContainers.map(container => (
                            <div key={container._id} className="container">
                                <p>Container ID: {container._id}</p>
                                {/* Display other container details here */}
                                {(container.status === 'available' || container.status === "in-transit") && (
                                    <button>Edit</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipperDashboard;