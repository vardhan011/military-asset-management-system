const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
    baseId: { type: mongoose.Schema.Types.ObjectId, ref: "Base", required: true },
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: "Asset", required: true },
    quantity: { type: Number, required: true },
    reason: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Expenditure", expenditureSchema);
