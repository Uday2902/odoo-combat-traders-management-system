// frontend/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import './error.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isExporter, setIsExporter] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        phoneNumber: '',
        email: '',
        password: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? 'http://localhost:5000/api/auth/login'
            : 'http://localhost:5000/api/auth/register';
        const role = isExporter ? 'exporter' : 'shipper';

        try {
            const response = await axios.post(url, { ...formData, role });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = isExporter ? '/exporter-dashboard' : '/shipper-dashboard';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="tabs">
                <button onClick={() => setIsLogin(true)}>Login</button>
                <button onClick={() => setIsLogin(false)}>Sign Up</button>
            </div>
            <div className="role-tabs">
                <button onClick={() => setIsExporter(true)}>Exporter</button>
                <button onClick={() => setIsExporter(false)}>Shipper</button>
            </div>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {!isExporter && (
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Company Name"
                                value={formData.companyName}
                                onChange={handleInputChange}
                            />
                        )}
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {!isExporter && (
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        )}
                    </>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
        </div>
    );
};

export default LoginPage;