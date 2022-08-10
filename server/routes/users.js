const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.users.get);
router.post('/', controllers.users.post);

module.exports = router;
