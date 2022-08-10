const router = require('express').Router();
const controllers = require('../controllers');

router.get('/', controllers.photos.getPhotos);
router.get('/countries', controllers.photos.getCountry);
router.post('/', controllers.photos.post);
router.put('/', controllers.photos.put);
router.delete('/:photo_id', controllers.photos.photoDelete);

module.exports = router;
