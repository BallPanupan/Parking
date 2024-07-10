const express = require('express');
const parking = require('../controllers/parking/index.js');
const router = express.Router();

router.get('/', parking.wellcome);

module.exports = router;