const { getCountries, getAllPhotos, createPhotos, updatePhoto, deletePhoto } = require('../models').photos;

// get country list by req.queryparam
const getCountry = (req, res) => {
  if (req.query.user_id === undefined) {
    res.sendStatus(400);
  } else {
    getCountries(req.query.user_id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error getting country list.', err);
        res.sendStatus(500);
      });
  }
};

// get all photos
const getPhotos = (req, res) => {
  if (req.query.user_id === undefined || req.query.country_code === undefined) {
    res.sendStatus(400);
  } else {
    getAllPhotos(req.query.user_id, req.query.country_code)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error getting photos.', err);
      });
  }
};

// post photo
const post = (req, res) => {
  if (req.body === undefined) {
    res.sendStatus(400);
  } else {
    createPhotos(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error creating photo.', err);
        res.sendStatus(500);
      });
  }
};

const put = (req, res) => {
  if (req.body === undefined) {
    res.sendStatus(400);
  } else {
    updatePhoto(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log('error updating photo.', err);
        res.sendStatus(500);
      });
  }
};

const photoDelete = (req, res) => {
  if (req.params.photo_id === undefined) {
    res.sendStatus(400);
  } else {
    deletePhoto(req.params.photo_id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log('error deleting photo.', err);
        res.sendStatus(500);
      });
  }
};

module.exports = {
  getCountry,
  getPhotos,
  post,
  put,
  photoDelete,
};
