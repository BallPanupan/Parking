const express = require('express');
const systemInstall = require('../controllers/systemInstallationController/index');
const router = express.Router();

router.get('/', systemInstall.install);

module.exports = router;