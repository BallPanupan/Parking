const express = require('express');
const locations = require('../controllers/locationController/index.js');
const router = express.Router();

router.get('/', locations.list);
router.post('/', locations.create);


module.exports = router;