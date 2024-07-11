const express = require('express');
const parkingPackage = require('../controllers/parkingPackageController/index.js');
const router = express.Router();

router.get('/', parkingPackage.getPackage);

module.exports = router;

