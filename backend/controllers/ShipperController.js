// backend/controllers/ShipperController.js

const Shipper = require('../models/Shipper');
const Container = require('../models/Container');

const getShipperDetails = async (req, res) => {
    try {
        const shipperId = req.user.userId;
        const shipper = await Shipper.findById(shipperId).select('-password');

        if (!shipper) {
            return res.status(404).json({ message: 'Shipper not found' });
        }

        res.json(shipper);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getShipperContainers = async (req, res) => {
    console.log("request /shipper", req.body);
    try {
        const shipperId = req.user.userId;
        const containers = await Container.find({ shipperId });

        // Separate containers by status
        // const availableContainers = containers.filter(container => container.status === 'available');
        // const inTransitContainers = containers.filter(container => container.status === 'in-transit');
        // const completedContainers = containers.filter(container => container.status === 'completed');
        // console.log(availableContainers, inTransitContainers, completedContainers);

        res.json(containers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const addContainer = async (req, res) => {
    console.log("Body ---- ", req.body);
    try {
        const shipperId = req.user.userId;
        console.log("id", shipperId);
        const { containerPickupAddress, containerDestinationAddress, containerPath, availableSpace, price, pickupDate, pickupTime, expectedDeliveryDate, expectedDeliveryTime, timeToReachForPickup } = req.body;

        const newContainer = new Container({
            shipperId,
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
            status: 'available',
            locationStatus: []
        });

        console.log("New container to be added ", newContainer);

        await newContainer.save();

        res.status(201).json({ message: 'Container added successfully', container: newContainer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const updateContainer = async (req, res) => {
    try {
        const { containerId } = req.params;
        const { containerPickupAddress, containerDestinationAddress, containerPath, availableSpace, price, pickupDate, pickupTime, expectedDeliveryDate, expectedDeliveryTime, timeToReachForPickup } = req.body;

        const updatedContainer = await Container.findByIdAndUpdate(
            containerId,
            { containerPickupAddress, containerDestinationAddress, containerPath, availableSpace, price, pickupDate, pickupTime, expectedDeliveryDate, expectedDeliveryTime, timeToReachForPickup },
            { new: true }
        );

        if (!updatedContainer) {
            return res.status(404).json({ message: 'Container not found' });
        }

        res.json({ message: 'Container updated successfully', container: updatedContainer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { getShipperDetails, getShipperContainers, addContainer, updateContainer };