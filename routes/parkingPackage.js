const express = require('express');
const parkingPackage = require('../controllers/parkingPackageController/index.js');
const router = express.Router();

router.get('/', parkingPackage.getPackage);
router.post('/', parkingPackage.create);


module.exports = router;

