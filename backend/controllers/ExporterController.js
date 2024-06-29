const Container = require('../models/Container');
// backend/controllers/ExporterController.js

const Exporter = require('../models/Exporter');
const Order = require('../models/Order');

const getExporterDetails = async (req, res) => {
    try {
        const exporterId = req.user.userId;
        const exporter = await Exporter.findById(exporterId).select('-password');

        if (!exporter) {
            return res.status(404).json({ message: 'Exporter not found' });
        }

        res.json(exporter);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getExporterOrders = async (req, res) => {
    try {
        const exporterId = req.user.userId;
        const orders = await Order.find({ exporterId }).populate('containerId');
        console.log("Array", orders);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const addOrder = async (req, res) => {
    try {
        const { containerId, orderSize } = req.body;
        const exporterId = req.user.userId;

        // Find the container and check the available space
        const container = await Container.findById(containerId);
        if (!container) {
            return res.status(404).json({ message: 'Container not found' });
        }
        
        if (container.availableSpace < orderSize) {
            return res.status(400).json({ message: 'Not enough available space in the container' });
        }

        // Create a new order
        const newOrder = new Order({
            exporterId,
            containerId
        });
        await newOrder.save();

        // Update the container's available space
        container.availableSpace -= parseInt(orderSize);
        await container.save();

        res.status(201).json({ message: 'Order created and container updated successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Payment Controller (with order creation)
const processPayment = async (req, res) => {
    try {
        const { containerId, orderSize, paymentDetails } = req.body;

        // Here you would integrate with a payment gateway like Stripe or PayPal
        // For simplicity, let's assume the payment is successful

        // Call addOrder to create the order and update the container's space
        req.user = { userId: req.user.userId }; // Mocking the user information from the auth middleware
        await addOrder(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Payment processing error', error });
    }
};

module.exports = { getExporterDetails, getExporterOrders, addOrder, processPayment };