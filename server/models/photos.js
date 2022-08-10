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
const createPhotos = ({
  url, description, user_id, country_code, visit_date
}) => (
  Photos.create({
    url,
    description,
    user_id,
    country_code,
    visit_date: new Date(visit_date),
  })
);

module.exports = {
  getCountries,
  getAllPhotos,
  createPhotos,
};
