module.exports = {
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