const { Sequelize } = require('sequelize');
const Photos = require('../db');

// get all countries that exist in the photos with target userId
const getCountries = (userId) => (
  Photos.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('country')), 'country'],
    ],
    where: {
      user_id: userId,
    },
  })
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
const createPhotos = ({
  userId, photo, description, countryCode, visitDate,
}) => (
  Photos.create({
    url: photo,
    description,
    user_id: userId,
    country_code: countryCode,
    visit_date: visitDate,
  })
);

module.exports = {
  getCountries,
  getAllPhotos,
  createPhotos,
};
