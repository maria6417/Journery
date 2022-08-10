const { getCountries, getAllPhotos, createPhotos } = require('../models').photos;

// get country list by req.queryparam
const getCountry = (req, res) => {
  getCountries(req.query.user_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log('error getting country list.', err);
      res.sendStatus(500);
    });
};

// get all photos
const getPhotos = (req, res) => {
  getAllPhotos(req.query.user_id, req.query.country_code)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log('error getting photos.', err);
    });
};

// post photo
const post = (req, res) => {
  createPhotos(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log('error creating photo.', err);
      res.sendStatus(500);
    });
};

module.exports = {
  getCountry,
  getPhotos,
  post,
};
