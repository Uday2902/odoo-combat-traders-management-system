// models/Order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    exporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exporter',
        required: true
    },
    containerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Container',
        required: true
    }
    // We can add more fields like order date, status, etc., if needed
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;