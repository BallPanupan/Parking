const express = require('express');
const parking = require('../controllers/parkingController/index.js');
const router = express.Router();

router.get('/', parking.listPackage);
router.get('/:id', parking.getPackage);
router.post('/', parking.create);
router.put('/:id', parking.update);
router.delete('/:id', parking.delete);

module.exports = router;