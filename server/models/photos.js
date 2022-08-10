const { Sequelize } = require('sequelize');
const { sequelize, Photos } = require('../db');

// get all countries that exist in the photos with target userId
const getCountries = (userId) => (
  sequelize.query(
    'select distinct country_code::VARCHAR from photos where user_id = ?',
    {
      replacements: [userId],
    },
  ).then((result) => result[0].map((obj) => obj.country_code))
);

// get all info with target userID & target countryCode
const getAllPhotos = (userId, countryCode) => (
  Photos.findAll({
    where: {
      user_id: userId,
      country_code: countryCode,
    },
  })
);

// create new photos record with provided data
const createPhotos = (data) => (
  Photos.create(data)
);

const updatePhoto = (data) => (
  Photos.update(data, {
    where: {
      id: data.id,
    },
    returning: true,
  }).then((result) => result[1][0])
);

const deletePhoto = (photoId) => (
  Photos.destroy({
    where: {
      id: photoId,
    },
  })
);

module.exports = {
  getCountries,
  getAllPhotos,
  createPhotos,
  updatePhoto,
  deletePhoto,
};
