// backend/models/ExporterOrder.js

const mongoose = require('mongoose');

const ExporterOrderSchema = new mongoose.Schema({
    exporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    containerId: { type: [mongoose.Schema.Types.ObjectId], ref: 'Container' }
});

module.exports = mongoose.model('ExporterOrder', ExporterOrderSchema);