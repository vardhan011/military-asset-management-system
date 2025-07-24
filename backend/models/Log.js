const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    action: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
