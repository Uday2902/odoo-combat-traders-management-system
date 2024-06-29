// backend/routes/index.js

const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const AuthController = require('../controllers/AuthController');
const ExporterController = require('../controllers/ExporterController');
const ShipperController = require('../controllers/ShipperController');
const ContainerController = require('../controllers/ContainerController');

const router = express.Router();

// Authentication routes
router.post('/auth/register', AuthController.registerUser);
router.post('/auth/login', AuthController.loginUser);

// Exporter routes
router.get('/exporter/details', authMiddleware, ExporterController.getExporterDetails);
router.get('/exporter/orders', authMiddleware, ExporterController.getExporterOrders);

router.post('/exporter/orders', authMiddleware, ExporterController.addOrder);
router.post('/exporter/payment', authMiddleware, ExporterController.processPayment);

// Shipper routes
router.get('/shipper/details', authMiddleware, ShipperController.getShipperDetails);
router.get('/shipper/containers', authMiddleware, ShipperController.getShipperContainers);
router.post('/shipper/containers', authMiddleware, ShipperController.addContainer);
router.put('/shipper/containers/:containerId', authMiddleware, ShipperController.updateContainer);

router.get('/getContainers', ContainerController.getAvailableContainers);

// Container routes
router.get('/containers', ContainerController.getAvailableContainers);

module.exports = router;
