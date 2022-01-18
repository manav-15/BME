const {Sequelize} = require('sequelize');

const dbConfig = require("../config/db.config.js");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user-model.js")(sequelize, Sequelize);
db.events = require("./event-model.js")(sequelize, Sequelize);
db.userEvents = require("./user-events")(sequelize, Sequelize);

db.users.belongsToMany(db.events, {through : db.userEvents});
db.events.belongsToMany(db.users, {through : db.userEvents});


module.exports = db;