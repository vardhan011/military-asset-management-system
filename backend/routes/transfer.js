const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Log = require('../models/Log');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// POST /api/transfers
router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
    const fromBaseId = req.user.baseId;
    const { toBaseId, assetType, quantity } = req.body;

    if (!toBaseId || !assetType || !quantity) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const qty = Number(quantity);
        if (isNaN(qty) || qty <= 0) {
            return res.status(400).json({ message: 'Invalid quantity' });
        }

        // Fetch inventory from source base
        const fromInventory = await Inventory.findOne({ baseId: fromBaseId, assetType });
        if (!fromInventory || fromInventory.closingBalance < qty) {
            return res.status(400).json({ message: 'Not enough stock at source base' });
        }


        fromInventory.transferOut += qty;
        fromInventory.closingBalance -= qty;
        await fromInventory.save();

        // Add to destination base (or create new entry)
        let toInventory = await Inventory.findOne({ baseId: toBaseId, assetType });
        if (!toInventory) {
            toInventory = new Inventory({
                baseId: toBaseId,
                assetType,
                openingBalance: 0,
                purchases: 0,
                transferIn: 0,
                transferOut: 0,
                assigned: 0,
                expended: 0,
                closingBalance: 0
            });
        }

        toInventory.transferIn += qty;
        toInventory.closingBalance += qty;
        await toInventory.save();

        // Log the transfer
        await Log.create({
            action: 'ASSET_TRANSFER',
            userId: req.user.id,
            details: { fromBaseId, toBaseId, assetType, quantity: qty }
        });

        res.status(200).json({ message: 'Transfer successful' });
    } catch (err) {
        console.error('Transfer Error:', err);
        res.status(500).json({ message: 'Transfer failed', error: err.message });
    }
});

module.exports = router;
