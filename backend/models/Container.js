// backend/models/Container.js

const mongoose = require('mongoose');

const containerSchema = new mongoose.Schema({
    shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper', required: true },
    containerPickupAddress: { type: String, required: true },
    containerDestinationAddress: { type: String, required: true },
    containerPath: { type: String },
    availableSpace: { type: Number, required: true },
    price: { type: Number, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String },
    expectedDeliveryDate: { type: Date, required: true },
    expectedDeliveryTime: { type: String },
    timeToReachForPickup: { type: String },
    status: { type: String, enum: ['available', 'in-transit', 'completed'], required: true },
    locationStatus: { type: [String] }
});

module.exports = mongoose.model('Container', containerSchema);