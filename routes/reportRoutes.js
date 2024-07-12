const express = require('express');
const report = require('../controllers/reportController/index.js');
const router = express.Router();

router.get('/', report.report);

module.exports = router;