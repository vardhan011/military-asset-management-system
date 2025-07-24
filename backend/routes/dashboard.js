const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// GET /api/dashboard
router.get('/', auth, role(['admin', 'commander', 'logistics']), async (req, res) => {
    const baseId = req.user.baseId; // user's assigned base

    try {
        // Get all inventory items for the base
        const data = await Inventory.find({ baseId });


        const dashboard = data.map(item => ({
            assetType: item.assetType,
            openingBalance: item.openingBalance,
            purchases: item.purchases,
            transferIn: item.transferIn,
            transferOut: item.transferOut,
            assigned: item.assigned,
            expended: item.expended,
            closingBalance: item.closingBalance,
            netMovement: item.purchases + item.transferIn - item.transferOut
        }));

        res.json({ dashboard });
    } catch (err) {
        res.status(500).json({ message: "Dashboard error", error: err.message });
    }
});

module.exports = router;
