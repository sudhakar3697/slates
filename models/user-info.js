const { Sequelize } = require('sequelize');
const logger = require('../custom-logger.js');

const sequelize = new Sequelize('sudax', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  (async () => {
    await sequelize.authenticate();
    logger.info('UserInfo - Connection has been established successfully.');
  })();
} catch (error) {
  logger.error(`UserInfo - Unable to connect to the database: ${error.message}`);
}

const { Model } = Sequelize;
class Users extends Model { }
Users.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    verified: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: 'user_info',
    timestamps: false,
    freezeTableName: true,
  },
);

sequelize.sync();

module.exports = Users;
