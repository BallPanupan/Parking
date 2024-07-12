const express = require('express');
const parking = require('../controllers/userController/index.js');
const router = express.Router();

router.get   ('/'   , parking.list);
router.get   ('/:id', parking.getUser );
router.post  ('/'   , parking.create     );
router.put   ('/:id', parking.update     );
router.delete('/:id', parking.delete     );

module.exports = router;