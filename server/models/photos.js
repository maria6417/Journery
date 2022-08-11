const { Sequelize } = require('sequelize');
const { sequelize, Photos } = require('../db');

// get all countries that exist in the photos with target userId
const getCountries = (userId) => (
  sequelize.query(
    `with t as (
      select count(*) as count, country_code from photos where user_id = ? group by country_code
    )
    select json_object_agg(distinct p.country_code, t.count) as results from photos p inner join t on p.country_code = t.country_code where p.user_id = ?`,
    {
      replacements: [userId, userId],
    },
  ).then((result) => result[0][0].results)
);

// get all info with target userID & target countryCode
const getAllPhotos = (userId, countryCode) => (
  Photos.findAll({
    where: {
      user_id: userId,
      country_code: countryCode,
    },
    order: [
      ['visit_date', 'DESC'],
    ],
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
