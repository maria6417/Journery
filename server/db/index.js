/* eslint-disable no-console */
const { Sequelize, DataTypes } = require('sequelize');

const username = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const host = process.env.PG_HOST;
const dbname = process.env.PG_DATABASE;

const sequelize = new Sequelize(dbname, username, password, {
  host,
  dialect: 'postgres',
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const Photos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: DataTypes.STRING,
  description: DataTypes.STRING,
  user_id: DataTypes.INTEGER,
  country_code: DataTypes.STRING,
  visit_date: DataTypes.DATE,
});

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

module.exports = {
  Photos,
  Users,
};
