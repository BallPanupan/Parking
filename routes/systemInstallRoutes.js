const express = require('express');
const systemInstall = require('../controllers/systemInstallation/index.js');
const router = express.Router();

router.get('/', systemInstall.install);

module.exports = router;