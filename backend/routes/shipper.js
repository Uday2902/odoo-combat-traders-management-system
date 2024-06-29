// backend/routes/shipper.js

const express = require('express');
const auth = require('../middleware/authMiddleware');
const Container = require('../models/Container');
const router = express.Router();

// Fetch all containers for a shipper
router.get('/containers', auth, async (req, res) => {
    try {
        const containers = await Container.find({ shipperId: req.user.id });
        res.status(200).json(containers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new container
router.post('/containers', auth, async (req, res) => {
    const {
        containerPickupAddress,
        containerDestinationAddress,
        containerPath,
        availableSpace,
        price,
        pickupDate,
        pickupTime,
        expectedDeliveryDate,
        expectedDeliveryTime,
        timeToReachForPickup
    } = req.body;
    
    try {
        const newContainer = new Container({
            shipperId: req.user.id,
            containerPickupAddress,
            containerDestinationAddress,
            containerPath,
            availableSpace,
            price,
            pickupDate,
            pickupTime,
            expectedDeliveryDate,
            expectedDeliveryTime,
            timeToReachForPickup,
            status: 'available'
        });
        await newContainer.save();
        res.status(201).json(newContainer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update container details
router.put('/containers/:id', auth, async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body;
    
    try {
        const updatedContainer = await Container.findByIdAndUpdate(id, updateFields, { new: true });
        res.status(200).json(updatedContainer);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;