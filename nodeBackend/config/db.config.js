module.exports = {
  // username = doadmin
  // password = BJVyF3P4ysDP5y2h
  // HOST = "private-db-mysql-blr1-39804-do-user-10835358-0.b.db.ondigitalocean.com",
  // port = 25060
  // database = defaultdb
  // sslmode = REQUIRED
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456789",
    DB: "event_management_system",
    dialect: "mysql",
    pool: { 
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000
    }
};