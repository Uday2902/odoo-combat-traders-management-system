// backend/controllers/ContainerController.js

const Container = require('../models/Container');

const getAvailableContainers = async (req, res) => {
    try {
        const { size, date, priceRange } = req.query;
        
        const filters = { status: 'available', availableSpace: { $gt: 0 } };

        // if (size) filters.availableSpace = { $gte: size };
        // if (date) filters.pickupDate = date;
        // if (priceRange) filters.price = { $lte: priceRange };

        const containers = await Container.find(filters);

        res.json(containers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getAvailableContainers };