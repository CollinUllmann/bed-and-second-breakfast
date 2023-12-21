const router = require('express').Router();
const { restoreUser, requireAuth } = require('../../utils/auth.js');
router.use(restoreUser);




module.exports = router;