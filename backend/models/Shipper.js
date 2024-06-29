// backend/models/Shipper.js

const mongoose = require('mongoose');

const shipperSchema = new mongoose.Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true }
});

module.exports = mongoose.model('Shipper', shipperSchema);