// backend/controllers/AuthController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Exporter = require('../models/Exporter');
const Shipper = require('../models/Shipper');

const registerUser = async (req, res) => {
    console.log("req", req.body);
    try {
        const { role, name, companyName, phoneNumber, email, password, address } = req.body;

        // Check if the user already exists
        let existingUser;
        if (role === 'exporter') {
            existingUser = await Exporter.findOne({ email });
        } else if (role === 'shipper') {
            existingUser = await Shipper.findOne({ email });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user based on role
        let newUser;
        if (role === 'exporter') {
            newUser = new Exporter({ name, phoneNumber, email, password: hashedPassword });
            console.log("New User - ", newUser);
        } else if (role === 'shipper') {
            newUser = new Shipper({ name, companyName, phoneNumber, email, password: hashedPassword, address });
        }

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        // Find user by role
        let user;
        if (role === 'exporter') {
            user = await Exporter.findOne({ email });
        } else if (role === 'shipper') {
            user = await Shipper.findOne({ email });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser, loginUser };