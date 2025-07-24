const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Inventory = require('../models/Inventory');
const Log = require('../models/Log');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// POST /api/purchases
router.get('/test', (req, res) => {
    res.send("Purchase route working ");
});

router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
    const { assetType, quantity } = req.body;
    const baseId = req.user.baseId;

    try {
        //  Save the purchase record
        const purchase = new Purchase({ baseId, assetType, quantity });
        await purchase.save();

        //  Update inventory for this base & asset
        const inventory = await Inventory.findOne({ baseId, assetType });

        if (inventory) {
            inventory.purchases += quantity;
            inventory.closingBalance += quantity;
            await inventory.save();
        } else {
            await Inventory.create({
                baseId,
                assetType, //  not assetId
                purchases: quantity,
                closingBalance: quantity
            });
        }

        // Log the purchase
        await Log.create({
            action: 'PURCHASE_CREATED',
            userId: req.user.id,
            details: { baseId, assetType, quantity }
        });

        res.status(201).json({ message: 'Purchase recorded successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Purchase failed', error: err.message });
    }
});

module.exports = router;
