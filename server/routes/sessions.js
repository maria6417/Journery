const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.sessions.getSession);
router.post('/', controllers.sessions.createSession);

module.exports = router;
