const { Sequelize }  = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
sequelize.sync()
  .then(() => console.log('Database schema updated and connected'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
