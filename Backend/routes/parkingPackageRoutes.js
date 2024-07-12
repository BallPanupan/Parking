const express = require('express');
const parkingPackage = require('../controllers/parkingPackageController/index.js');
const router = express.Router();

router.get   ('/'   , parkingPackage.listPackage);
router.get   ('/:id', parkingPackage.getPackage );
router.post  ('/'   , parkingPackage.create     );
router.put   ('/:id', parkingPackage.update     );
router.delete('/:id', parkingPackage.delete     );


module.exports = router;