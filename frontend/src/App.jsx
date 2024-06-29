// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import ExporterDashboard from './pages/ExporterDashboard';
import ShipperDashboard from './pages/ShipperDashboard';
import AddContainer from './pages/AddContainer';
import ShipNow from './pages/ShipNow';
import Payment from './pages/Payment';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path='/exporter-shipnow' element={<ShipNow />} />
                <Route path="/exporter-dashboard" element={<ExporterDashboard />} />
                <Route path="/shipper-dashboard" element={<ShipperDashboard />} />
                <Route path="/add-container" element={<AddContainer />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
