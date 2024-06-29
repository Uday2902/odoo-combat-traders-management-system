// backend/routes/exporter.js

const express = require('express');
const auth = require('../middleware/authMiddleware');
const Container = require('../models/Container');
const ExporterOrder = require('../models/ExporterOrder');
const router = express.Router();

// Fetch all containers with status 'available' and non-zero available space
router.get('/containers', auth, async (req, res) => {
    try {
        const containers = await Container.find({ status: 'available', availableSpace: { $gt: 0 } });
        res.status(200).json(containers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch exporter's orders
router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await ExporterOrder.find({ exporterId: req.user.id }).populate('containerId');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;