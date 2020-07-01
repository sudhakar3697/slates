const Sequelize = require('sequelize');
const logger = require('../custom-logger.js');
const config = require('../config.js');

const sequelize = new Sequelize(config.DATABASE, config.USER_NAME, config.PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  (async () => {
    await sequelize.authenticate();
    logger.info('UserSessionInfo - Connection has been established successfully.');
  })();
} catch (error) {
  logger.error(`UserSessionInfo - Unable to connect to the database: ${error.message}`);
}

const { Model } = Sequelize;
class UserSessions extends Model { }
UserSessions.init(
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    sessionId: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'user_session_info',
    timestamps: false,
    freezeTableName: true,
  },
);

sequelize.sync();

module.exports = UserSessions;
